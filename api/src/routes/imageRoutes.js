const express = require('express');
const { signImageController, fetchImageController } = require('../controllers/imageController');
const { validate } = require('../middlewares/validate');
const { signImageSchema, fetchImageSchema } = require('../validators/imageSchemas');

const router = express.Router();

router.get('/sign', validate(signImageSchema), signImageController);
router.get('/fetch', validate(fetchImageSchema), fetchImageController);

module.exports = router;
