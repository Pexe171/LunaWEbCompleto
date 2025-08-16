const { createLogger, format, transports } = require('winston');
const config = require('./index');

const logger = createLogger({
    level: config.logLevel,
    format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        format.json()
    ),
    transports: [new transports.Console()]
});

module.exports = { logger };

