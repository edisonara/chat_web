const { z } = require('zod');
const logger = require('./utils/logger');

// Esquemas de validación
const usernameSchema = z.string().min(1).max(50);
const chatMessageSchema = z.object({
  message: z.string().min(1).max(500),
  username: usernameSchema
});

module.exports = (httpServer) => {
    const { Server } = require('socket.io');
    const io = new Server(httpServer, {
  cors: {
    origin: '*'
  }
});

    // Mantener registro de usuarios conectados
    const users = new Map();

    io.on('connection', (socket) => {
        logger.info(`${socket.id} conectado`);

        // Manejar cuando un usuario se une
        socket.on('user joined', (username) => {
            try {
                usernameSchema.parse(username);
                users.set(socket.id, username);
                io.emit('user count', users.size);
                // Notificar a otros que un usuario se unió
                socket.broadcast.emit('chat message', {
                    message: `${username} se ha unido al chat`,
                    username: 'Sistema'
                });
            } catch (err) {
                logger.error(err);
                socket.emit('error', 'Nombre de usuario inválido');
            }
        });


        // Manejar mensajes del chat
        socket.on('chat message', (data) => {
            try {
                chatMessageSchema.parse(data);
                io.emit('chat message', data);
            } catch (err) {
                logger.error(err);
                socket.emit('error', 'Mensaje no válido');
            }
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
            logger.info(`${socket.id} desconectado`);
        });
    });
};
