const { createLogger, format, transports } = require('winston');

// Basic Winston logger configuration
const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // Print logs to the console
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, timestamp, stack }) =>
          `${timestamp} [${level}]: ${stack || message}`
        )
      )
    }),
    // Additionally write error logs to a file in production
    new transports.File({ filename: 'logs/error.log', level: 'error' })
  ]
});

module.exports = logger;
