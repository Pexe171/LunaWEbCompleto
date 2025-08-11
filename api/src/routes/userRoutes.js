const express = require('express');
const { body } = require('express-validator');
const { getMe, updateMe, changePassword, getUsersCount } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');

const router = express.Router();

router.get('/count', getUsersCount);
router.get('/me', authMiddleware, getMe);

router.put('/me',
  authMiddleware,
  [
    body('name').optional().isString().withMessage('Nome inválido.'),
    body('bio').optional().isString().withMessage('Bio inválida.')
  ],
  validate,
  updateMe
);

router.post('/change-password',
  authMiddleware,
  [
    body('currentPassword').isString().withMessage('Senha atual é obrigatória.'),
    body('newPassword')
      .isLength({ min: 8 }).withMessage('A nova senha deve ter no mínimo 8 caracteres.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      .withMessage('A nova senha deve conter maiúscula, minúscula, número e caractere especial.')
  ],
  validate,
  changePassword
);

module.exports = router;
