const rateLimit = require('express-rate-limit');

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Max 10 requests per 15 minutes per IP
    message: 'Muitas tentativas de login a partir deste IP, por favor tente novamente após 15 minutos.'
});

module.exports = { loginRateLimiter };
