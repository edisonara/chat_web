const express = require('express');
const { createServer } = require('http');
const realTimeServer = require('./realTimeServer');
const path = require('path');
const logger = require('./utils/logger');

// Manejar errores no atrapados a nivel de proceso
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled Rejection:', reason);
});
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err);
});
const cookieParser = require('cookie-parser');

const app = express();
const httpServer = createServer(app);

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.json()); // Soportar JSON en peticiones

// Rutas
app.use(require('./routes'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Ruta 404
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Middleware global de manejo de errores
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// Iniciar el servidor
httpServer.listen(app.get('port'), () => {
    logger.info(`Servidor corriendo en http://localhost:${app.get('port')}`);
})

// Llamo al servidor en tiempo real
realTimeServer(httpServer);