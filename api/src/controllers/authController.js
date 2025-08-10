const userService = require('../services/userService');
const authService = require('../services/authService');
const { getTokens } = require('../utils/jwt');
const { logger } = require('../config/logger');

const createUserController = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        const newUser = await userService.createUser(email, password, role);
        res.status(201).json({ message: 'Usuário criado com sucesso!', userId: newUser._id });
    } catch (err) {
        next(err);
    }
};

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        res.json(result);
    } catch (err) {
        logger.error(`Erro de login: ${err.message}`);
        res.status(401).json({ message: 'Credenciais inválidas.' });
    }
};

const refreshController = async (req, res, next) => {
    try {
        const { refreshToken } = getTokens(req);
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token não fornecido.' });
        }
        const result = await authService.refreshTokens(refreshToken);
        res.json(result);
    } catch (err) {
        logger.error(`Erro ao atualizar token: ${err.message}`);
        res.status(401).json({ message: 'Credenciais inválidas.' });
    }
};

const logoutController = async (req, res, next) => {
    try {
        const { refreshToken } = getTokens(req);
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token não fornecido.' });
        }
        await authService.logout(req.user._id, refreshToken);
        res.status(200).json({ message: 'Logout bem-sucedido.' });
    } catch (err) {
        next(err);
    }
};

module.exports = { createUserController, loginController, refreshController, logoutController };
