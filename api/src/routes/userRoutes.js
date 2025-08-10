const express = require('express');
const { body } = require('express-validator');
const { updateProfileController } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');

const router = express.Router();

const profileValidation = [
    body('name').optional().isString(),
    body('avatarUrl').optional().isURL().withMessage('URL inválida.'),
    body('bio').optional().isString(),
    body('socialLinks').optional().isObject(),
];

router.put('/profile', authMiddleware, profileValidation, validate, updateProfileController);

module.exports = router;
