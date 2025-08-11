const express = require('express');
const { body, param } = require('express-validator');
const { getGalleryController, createGalleryController, addLikeController, removeLikeController, deleteGalleryController } = require('../controllers/galleryController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');

const router = express.Router();

const createGalleryImageValidation = [
    body('title').isString().notEmpty().withMessage('Título é obrigatório.'),
    body('url').isString().isURL().withMessage('URL da imagem inválida.'),
];

router.get('/', getGalleryController);
router.post(
    '/',
    authMiddleware,
    adminMiddleware,
    createGalleryImageValidation,
    validate,
    createGalleryController
);
router.delete(
    '/:imageId',
    authMiddleware,
    adminMiddleware,
    [param('imageId').isMongoId().withMessage('ID de imagem inválido.')],
    validate,
    deleteGalleryController
);
router.post('/:imageId/like', authMiddleware, [param('imageId').isMongoId().withMessage('ID de imagem inválido.')], validate, addLikeController);
router.delete('/:imageId/like', authMiddleware, [param('imageId').isMongoId().withMessage('ID de imagem inválido.')], validate, removeLikeController);

module.exports = router;
