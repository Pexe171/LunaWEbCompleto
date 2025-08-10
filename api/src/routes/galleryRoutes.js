const express = require('express');
const { body, param } = require('express-validator');
const { getGalleryController, createGalleryController, addLikeController, removeLikeController } = require('../controllers/galleryController');
const { authMiddleware, checkLicenseMiddleware, adminMiddleware } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');

const router = express.Router();

const createGalleryImageValidation = [
    body('title').isString().notEmpty().withMessage('Título é obrigatório.'),
    body('url').optional().isURL().withMessage('URL inválida.'),
    body('fileId').optional().isString().notEmpty().withMessage('fileId não pode ser vazio.'),
    body('description').optional().isString().withMessage('Descrição deve ser uma string.'),
    body('artist').optional().isString().withMessage('Artista deve ser uma string.'),
    body('technique').optional().isString().withMessage('Técnica deve ser uma string.'),
    body('tags').optional().isArray().withMessage('Tags devem ser um array de strings.'),
    body('tags.*').isString().isLength({ max: 24 }).withMessage('Cada tag deve ser uma string com no máximo 24 caracteres.'),
];

router.get('/', getGalleryController);
router.post('/', authMiddleware, adminMiddleware, checkLicenseMiddleware, createGalleryImageValidation, validate, createGalleryController);
router.post('/:imageId/like', authMiddleware, checkLicenseMiddleware, [param('imageId').isMongoId().withMessage('ID de imagem inválido.')], validate, addLikeController);
router.delete('/:imageId/like', authMiddleware, checkLicenseMiddleware, [param('imageId').isMongoId().withMessage('ID de imagem inválido.')], validate, removeLikeController);

module.exports = router;
