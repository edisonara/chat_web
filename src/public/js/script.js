const socket = io();
let username = '';

// Mostrar modal de inicio de sesión al cargar la página
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
loginModal.show();

// Manejar envío del formulario de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    username = document.getElementById('username').value.trim();
    if (username) {
        socket.emit('user joined', username);
        loginModal.hide();
    }
});

// Manejar envío de mensajes
document.getElementById('messageForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message && username) {
        socket.emit('chat message', {
            message,
            username
        });
        messageInput.value = '';
    }
});

// Manejar mensajes recibidos
socket.on('chat message', (data) => {
    addMessage(data.message, data.username === username ? 'sent' : 'received', data.username);
    showNotification(data.username, data.message);
});

// Manejar actualizaciones del contador de usuarios
socket.on('user count', (count) => {
    document.getElementById('onlineCount').textContent = `${count} en línea`;
});

// Añadir mensaje al chat
function addMessage(message, type, sender) {
    const messageContainer = document.getElementById('messageContainer');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', type);

    const contentElement = document.createElement('div');
    contentElement.classList.add('message-content');
    contentElement.textContent = message;

    const metaElement = document.createElement('div');
    metaElement.classList.add('message-meta');
    metaElement.textContent = type === 'sent' ? 'Tú' : sender;

    messageElement.appendChild(contentElement);
    messageElement.appendChild(metaElement);
    messageContainer.appendChild(messageElement);

    // Desplazar al fondo
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Mostrar notificación de escritorio
function showNotification(sender, message) {
    // Solo mostrar notificación para mensajes recibidos cuando la ventana no esté enfocada
    if (sender !== username && document.hidden) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.textContent = `${sender}: ${message}`;
        document.body.appendChild(notification);

        // Eliminar notificación después de la animación
        setTimeout(() => notification.remove(), 3000);

        // También mostrar notificación del navegador si está permitido
        if (Notification.permission === 'granted') {
            new Notification('Nuevo Mensaje', {
                body: `${sender}: ${message}`,
                icon: '/favicon.ico'
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    }
}

// Configuración del selector de emojis
const messageInput = document.getElementById('messageInput');
const emojiContainer = document.getElementById('emojiContainer');

// Función para insertar emoji en el input
function insertEmoji(emoji) {
    const cursorPos = messageInput.selectionStart;
    const textBefore = messageInput.value.substring(0, cursorPos);
    const textAfter = messageInput.value.substring(cursorPos);
    messageInput.value = textBefore + emoji + textAfter;
    // Mover el cursor después del emoji
    const newCursorPos = cursorPos + emoji.length;
    messageInput.setSelectionRange(newCursorPos, newCursorPos);
    messageInput.focus();
}

// Manejar la selección de emojis
document.querySelectorAll('.btn-emoji-item').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        insertEmoji(button.dataset.emoji);
    });
});

// Manejar el cambio de categorías
document.querySelectorAll('.emoji-categories .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        // Remover la clase active de todos los botones
        document.querySelectorAll('.emoji-categories .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        // Añadir la clase active al botón clickeado
        button.classList.add('active');
        // Ocultar todos los grupos de emojis
        document.querySelectorAll('.emoji-group').forEach(group => {
            group.classList.add('d-none');
        });
        // Mostrar el grupo seleccionado
        const category = button.dataset.category;
        document.querySelector(`.emoji-group[data-category="${category}"]`).classList.remove('d-none');
    });
});