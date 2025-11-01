const express = require('express');
const { getGalleryController, createGalleryController, addLikeController, removeLikeController, deleteGalleryController, updateGalleryStatusController } = require('../controllers/galleryController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { uploadRateLimiter } = require('../middlewares/rateLimiter');
const { createGalleryImageSchema, imageIdParamSchema, updateImageStatusSchema } = require('../validators/gallerySchemas');

const router = express.Router();

router.get('/', getGalleryController);
router.post('/', authMiddleware, uploadRateLimiter, validate(createGalleryImageSchema), createGalleryController);
router.delete('/:imageId', authMiddleware, adminMiddleware, validate(imageIdParamSchema), deleteGalleryController);
router.post('/:imageId/like', authMiddleware, validate(imageIdParamSchema), addLikeController);
router.delete('/:imageId/like', authMiddleware, validate(imageIdParamSchema), removeLikeController);
router.patch('/:imageId/status', authMiddleware, adminMiddleware, validate(updateImageStatusSchema), updateGalleryStatusController);

module.exports = router;
