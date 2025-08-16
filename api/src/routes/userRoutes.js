const express = require('express');
const { getMe, updateMe, changePassword, getUsersCount } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { updateMeSchema, changePasswordSchema } = require('../validators/userSchemas');

const router = express.Router();

router.get('/count', getUsersCount);
router.get('/me', authMiddleware, getMe);

router.put('/me', authMiddleware, validate(updateMeSchema), updateMe);

router.post('/change-password', authMiddleware, validate(changePasswordSchema), changePassword);

module.exports = router;
