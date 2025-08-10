const express = require('express');
const { body } = require('express-validator');
const { getProfileController, updateProfileController, changePasswordController } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');

const router = express.Router();

router.get('/me', authMiddleware, getProfileController);

router.put(
  '/me',
  authMiddleware,
  [
    body('name').optional().isString(),
    body('bio').optional().isString(),
  ],
  validate,
  updateProfileController
);

router.put(
  '/change-password',
  authMiddleware,
  [
    body('currentPassword').isString().withMessage('Senha atual é obrigatória.'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage('A senha deve ter no mínimo 8 caracteres.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage('A senha deve conter maiúscula, minúscula, número e caractere especial.'),
  ],
  validate,
  changePasswordController
);

module.exports = router;
