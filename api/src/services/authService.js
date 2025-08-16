const User = require('../models/User');
const { generateTokenPair, hashToken, saveRefreshToken } = require('../utils/jwt');
const { logger } = require('../config/logger');
const AppError = require('../utils/AppError');

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        throw new AppError('Credenciais inválidas.', 401);
    }

    const { accessToken, refreshToken } = generateTokenPair(user._id);
    await saveRefreshToken(user._id, refreshToken);

    return {
        accessToken,
        refreshToken,
        user: {
            email: user.email,
            role: user.role,
            name: user.name,
            bio: user.bio
        }
    };
};

const refreshTokens = async (refreshToken) => {
    const user = await User.findOne({
        'refreshTokens.tokenHash': hashToken(refreshToken)
    });

    if (!user) {
        throw new AppError('Refresh token inválido.', 401);
    }

    const tokenRecord = user.refreshTokens.find(token => token.tokenHash === hashToken(refreshToken));

    if (tokenRecord.expiresAt < new Date()) {
        // O token expirou, vamos limpá-lo e lançar um erro
        await User.findByIdAndUpdate(user._id, { $pull: { refreshTokens: { tokenHash: hashToken(refreshToken) } } });
        throw new AppError('Refresh token expirado.', 401);
    }

    // Remove o token antigo
    await User.findByIdAndUpdate(user._id, { $pull: { refreshTokens: { tokenHash: hashToken(refreshToken) } } });

    // Gera e salva um novo par de tokens
    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = generateTokenPair(user._id);
    await saveRefreshToken(user._id, newRefreshToken);

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
};

const logout = async (userId, refreshToken) => {
    if (!refreshToken) {
        throw new AppError('Refresh token não fornecido.', 401);
    }
    await User.findByIdAndUpdate(userId, {
        $pull: { refreshTokens: { tokenHash: hashToken(refreshToken) } }
    });
};

module.exports = { login, refreshTokens, logout };
