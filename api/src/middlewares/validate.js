const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Retorna uma mensagem de erro genérica para login
        if (req.originalUrl === '/api/v1/auth/login' || req.originalUrl === '/api/v1/auth/refresh-token') {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validate };
