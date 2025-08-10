const jwt = require('jsonwebtoken');
const config = require('../config');
const { getTokens } = require('../utils/jwt');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    try {
        const { accessToken } = getTokens(req);
        if (!accessToken) {
            return res.status(401).json({ message: 'Token de acesso não fornecido.' });
        }

        const decoded = jwt.verify(accessToken, config.jwt.secret);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token de acesso expirado.' });
        }
        return res.status(401).json({ message: 'Token de acesso inválido.' });
    }
};

const checkLicenseMiddleware = (req, res, next) => {
    const isLicenseValid = req.user.licenseExpiresAt > new Date();
    if (!isLicenseValid) {
        return res.status(403).json({ message: 'Licença expirada. Renove sua licença para continuar.' });
    }
    next();
};

module.exports = { authMiddleware, checkLicenseMiddleware };
