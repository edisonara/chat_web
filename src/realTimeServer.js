module.exports = (httpServer) => {
    const { Server } = require('socket.io');
    const io = new Server(httpServer);

    // Mantener registro de usuarios conectados
    const users = new Map();

    io.on('connection', (socket) => {
        console.log(socket.id, 'conectado');

        // Manejar cuando un usuario se une
        socket.on('user joined', (username) => {
            users.set(socket.id, username);
            io.emit('user count', users.size);
            // Notificar a otros que un usuario se unió
            socket.broadcast.emit('chat message', {
                message: `${username} se ha unido al chat`,
                username: 'Sistema'
            });
        });

        // Manejar mensajes del chat
        socket.on('chat message', (data) => {
            io.emit('chat message', data);
        });

        // Manejar desconexión
        socket.on('disconnect', () => {
            const username = users.get(socket.id);
            if (username) {
                users.delete(socket.id);
                io.emit('user count', users.size);
                // Notificar a otros que el usuario se ha ido
                socket.broadcast.emit('chat message', {
                    message: `${username} ha abandonado el chat`,
                    username: 'Sistema'
                });
            }
            console.log(socket.id, 'desconectado');
        });
    });
};
