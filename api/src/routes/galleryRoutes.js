const express = require('express');
const { body, param } = require('express-validator');
const { getGalleryController, createGalleryController, addLikeController, removeLikeController, deleteGalleryController } = require('../controllers/galleryController');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === 'video' ? 'videos' : 'images';
        const uploadPath = path.join(__dirname, '..', '..', 'uploads', folder);
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'image') {
        if (['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de imagem não suportado.'), false);
        }
    } else if (file.fieldname === 'video') {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Tipo de vídeo não suportado.'), false);
        }
    } else {
        cb(new Error('Tipo de arquivo não suportado.'), false);
    }
};

const upload = multer({ storage, fileFilter });

const createGalleryImageValidation = [
    body('title').isString().notEmpty().withMessage('Título é obrigatório.'),
];

router.get('/', getGalleryController);
router.post(
    '/',
    authMiddleware,
    adminMiddleware,
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]),
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
