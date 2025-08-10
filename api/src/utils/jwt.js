const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const config = require('../config');
const User = require('../models/User');

const generateTokenPair = (userId) => {
    const accessToken = jwt.sign({ id: userId }, config.jwt.secret, {
        expiresIn: config.jwt.accessExpiresIn
    });
    const refreshToken = jwt.sign({ id: userId }, config.jwt.secret, {
        expiresIn: `${config.jwt.refreshExpiresInDays}d`
    });
    return { accessToken, refreshToken };
};

const hashToken = (token) => {
    return crypto.createHash('sha512').update(token).digest('hex');
};

const saveRefreshToken = async (userId, refreshToken) => {
    const tokenHash = hashToken(refreshToken);
    const expiresAt = new Date(Date.now() + config.jwt.refreshExpiresInDays * 24 * 60 * 60 * 1000);
    await User.findByIdAndUpdate(userId, { $push: { refreshTokens: { tokenHash, expiresAt } } });
};

const getTokens = (req) => {
    const authHeader = req.headers['authorization'] || '';
    const accessToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    const refreshToken = req.headers['x-refresh-token'] || req.body.refreshToken || null;
    return { accessToken, refreshToken };
};

module.exports = { generateTokenPair, hashToken, saveRefreshToken, getTokens };
