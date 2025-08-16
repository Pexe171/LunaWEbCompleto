const express = require('express');
const { createUserController, loginController, refreshController, logoutController } = require('../controllers/authController');
const { validate } = require('../middlewares/validate');
const { loginRateLimiter } = require('../middlewares/rateLimiter');
const { authMiddleware } = require('../middlewares/auth');
const { createUserSchema, loginSchema, refreshTokenSchema } = require('../validators/authSchemas');

const router = express.Router();

router.post('/create-user', validate(createUserSchema), createUserController);
router.post('/login', loginRateLimiter, validate(loginSchema), loginController);
router.post('/refresh-token', validate(refreshTokenSchema), refreshController);
router.post('/logout', authMiddleware, logoutController);

module.exports = router;
