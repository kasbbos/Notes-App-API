// logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Определяем формат сообщений логов
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// Настройка логгера
const logger = createLogger({
  level: 'info', // уровень логирования по умолчанию
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    colorize(),
    logFormat
  ),
  transports: [
    new transports.Console(), // Логи в консоль
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Ошибки в файл
    new transports.File({ filename: 'logs/combined.log' }) // Все логи в другой файл
  ],
});

module.exports = logger;