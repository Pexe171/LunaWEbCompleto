const express = require('express');
const { getGalleryController, createGalleryController, addLikeController, removeLikeController, deleteGalleryController } = require('../controllers/galleryController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { createGalleryImageSchema, imageIdParamSchema } = require('../validators/gallerySchemas');

const router = express.Router();

router.get('/', getGalleryController);
router.post('/', authMiddleware, adminMiddleware, validate(createGalleryImageSchema), createGalleryController);
router.delete('/:imageId', authMiddleware, adminMiddleware, validate(imageIdParamSchema), deleteGalleryController);
router.post('/:imageId/like', authMiddleware, validate(imageIdParamSchema), addLikeController);
router.delete('/:imageId/like', authMiddleware, validate(imageIdParamSchema), removeLikeController);

module.exports = router;
