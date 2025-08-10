const express = require('express');
const { body } = require('express-validator');
const { verifyLicenseController, renewLicenseController } = require('../controllers/licenseController');
const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.get('/verify-license', authMiddleware, verifyLicenseController);
router.post('/renew-license', authMiddleware, renewLicenseController);

module.exports = router;
