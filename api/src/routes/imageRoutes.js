const express = require('express');
const { signImageController, fetchImageController } = require('../controllers/imageController');

const router = express.Router();

router.get('/sign', signImageController);
router.get('/fetch', fetchImageController);

module.exports = router;
