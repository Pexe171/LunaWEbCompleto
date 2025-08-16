const { logger } = require('../config/logger');
const config = require('../config');

const errorHandler = (err, req, res, next) => {
    logger.error(err.message);
    const statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);
    const response = {
        codigo: statusCode,
        mensagem: err.message || 'Erro interno do servidor',
    };
    if (err.details) {
        response.detalhes = err.details;
    }
    if (config.env === 'development' && err.stack) {
        response.stack = err.stack;
    }
    res.status(statusCode).json(response);
};

module.exports = { errorHandler };
