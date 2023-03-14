const winston = require('winston')
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/error/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'logs/combinedlog.log' }),
  ],
})


