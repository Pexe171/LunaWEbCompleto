const { createLogger, format, transports } = require('winston');
const config = require('./index');

const logger = createLogger({
    level: config.logLevel,
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level}] ${message}`)
    ),
    transports: [new transports.Console()]
});

module.exports = { logger };

