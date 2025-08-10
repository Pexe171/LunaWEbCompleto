const { logger } = require('../config/logger');
const config = require('../config');

const errorHandler = (err, req, res, next) => {
    logger.error(err.message);
    
    // Erros de validação do Mongoose
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(el => el.message);
        return res.status(400).json({ message: `Erros de validação: ${errors.join(', ')}` });
    }

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: config.env === 'development' ? err.stack : undefined
    });
};

module.exports = { errorHandler };
