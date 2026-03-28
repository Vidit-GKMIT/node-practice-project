const { createLogger, format, transports } = require('winston');

const customFormat = format.combine(
  format.timestamp(),
  format.json()
);

const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    new transports.Console(),
    new transports.File({filename: 'error.logs.json', level: 'error'})
  ]
});

module.exports = logger;