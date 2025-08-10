const express = require('express');
const { body } = require('express-validator');
const { createUserController, loginController, refreshController, logoutController } = require('../controllers/authController');
const { validate } = require('../middlewares/validate');
const { loginRateLimiter } = require('../middlewares/rateLimiter');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

// Validação para criar usuário
const createUserValidation = [
    body('email').isEmail().normalizeEmail().withMessage('Email inválido.'),
    body('password').isLength({ min: 8 }).withMessage('A senha deve ter no mínimo 8 caracteres.')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('A senha deve conter maiúscula, minúscula, número e caractere especial.')
];

// Validação para login
const loginValidation = [
    body('email').isEmail().withMessage('Email inválido.'),
    body('password').isString().withMessage('Senha é obrigatória.')
];

// Validação para refresh token
const refreshTokenValidation = [
    body('refreshToken').isJWT().withMessage('Refresh token inválido.')
];

router.post('/create-user', createUserValidation, validate, createUserController);
router.post('/login', loginRateLimiter, loginValidation, validate, loginController);
router.post('/refresh-token', refreshTokenValidation, validate, refreshController);
router.post('/logout', authMiddleware, logoutController);

module.exports = router;
