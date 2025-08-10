const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const config = require('../config');

const generateTokenPair = (userId) => {
    const accessToken = jwt.sign({ id: userId }, config.jwt.secret, { expiresIn: config.jwt.accessExpires });
    const refreshToken = jwt.sign({ id: userId }, config.jwt.refreshSecret, { expiresIn: config.jwt.refreshExpires });
    return { accessToken, refreshToken };
};

const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};

const saveRefreshToken = async (userId, refreshToken) => {
    const tokenHash = hashToken(refreshToken);
    const decoded = jwt.decode(refreshToken);
    const expiresAt = new Date(decoded.exp * 1000);

    await User.findByIdAndUpdate(userId, {
        $push: { refreshTokens: { tokenHash, expiresAt } }
    });
};

const getTokens = (req) => {
    const authHeader = req.headers.authorization || '';
    const accessToken = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    const refreshToken = req.headers['x-refresh-token'] || req.cookies?.refreshToken || null;
    return { accessToken, refreshToken };
};

module.exports = { generateTokenPair, hashToken, saveRefreshToken, getTokens };

