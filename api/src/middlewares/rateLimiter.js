const rateLimit = require('express-rate-limit');
const config = require('../config');
const { logger } = require('../config/logger');

const defaultMessage = 'Limite de requisições atingido. Tente novamente mais tarde.';

const createRateLimiter = ({ windowMs, max }) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next, options) => {
      logger.warn(`IP ${req.ip} excedeu limite em ${req.originalUrl}`);
      res.status(options.statusCode).json({ message: defaultMessage });
    },
    message: { message: defaultMessage }
  });

const authRateLimiter = createRateLimiter(config.rateLimit.auth);
const uploadRateLimiter = createRateLimiter(config.rateLimit.upload);

module.exports = { authRateLimiter, uploadRateLimiter };
