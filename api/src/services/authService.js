const User = require('../models/User');
const { generateTokenPair, hashToken, saveRefreshToken } = require('../utils/jwt');
const { logger } = require('../config/logger');

const login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        throw new Error('Credenciais inválidas.');
    }

    const { accessToken, refreshToken } = generateTokenPair(user._id);
    await saveRefreshToken(user._id, refreshToken);

    return {
        accessToken,
        refreshToken,
        user: {
            email: user.email,
            licenseExpiresAt: user.licenseExpiresAt,
            name: user.name,
            avatarUrl: user.avatarUrl,
            bio: user.bio,
            socialLinks: user.socialLinks
        }
    };
};

const refreshTokens = async (refreshToken) => {
    const user = await User.findOne({
        'refreshTokens.tokenHash': hashToken(refreshToken)
    });

    if (!user) {
        throw new Error('Refresh token inválido.');
    }

    const tokenRecord = user.refreshTokens.find(token => token.tokenHash === hashToken(refreshToken));

    if (tokenRecord.expiresAt < new Date()) {
        // O token expirou, vamos limpá-lo e lançar um erro
        await User.findByIdAndUpdate(user._id, { $pull: { refreshTokens: { tokenHash: hashToken(refreshToken) } } });
        throw new Error('Refresh token expirado.');
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
        throw new Error('Refresh token não fornecido.');
    }
    await User.findByIdAndUpdate(userId, {
        $pull: { refreshTokens: { tokenHash: hashToken(refreshToken) } }
    });
};

module.exports = { login, refreshTokens, logout };
