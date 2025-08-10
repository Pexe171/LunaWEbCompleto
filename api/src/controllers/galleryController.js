const galleryService = require('../services/galleryService');
const { logger } = require('../config/logger');
const path = require('path');
const fs = require('fs');
const { convertIPvToPNG } = require('../utils/ipvConverter');

const getGalleryController = async (req, res, next) => {
    try {
        const { tags, search, page, limit, technique, artist, date } = req.query;
        const filters = {
            tags: tags ? tags.split(',') : undefined,
            search,
            technique,
            artist,
            date,
            page: parseInt(page, 10),
            limit: parseInt(limit, 10)
        };
        const result = await galleryService.getGalleryImages(filters);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

const createGalleryController = async (req, res, next) => {
    try {
        const imageFile = req.files && req.files.image ? req.files.image[0] : null;
        if (!imageFile) {
            return res.status(400).json({ message: 'Imagem é obrigatória.' });
        }

        const videoFile = req.files && req.files.video ? req.files.video[0] : null;
        const tags = req.body.tags
            ? req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            : [];

        const baseUrl = `${req.protocol}://${req.get('host')}`;
        let finalImageName = imageFile.filename;

        // If the uploaded file is an IPv file, attempt to convert it to PNG
        if (path.extname(imageFile.filename).toLowerCase() === '.ipv') {
            const ipvPath = imageFile.path;
            const pngName = imageFile.filename.replace(/\.ipv$/i, '.png');
            const pngPath = path.join(imageFile.destination, pngName);
            try {
                await convertIPvToPNG(ipvPath, pngPath);
                fs.unlinkSync(ipvPath);
                finalImageName = pngName;
            } catch (conversionErr) {
                logger.error('Erro ao converter arquivo IPV', conversionErr);
                return res.status(500).json({ message: 'Falha ao converter arquivo IPV.' });
            }
        }

        const imageUrl = `${baseUrl}/uploads/images/${finalImageName}`;
        const data = {
            title: req.body.title,
        };

        data.url = imageUrl;
        if (videoFile) {
            data.videoUrl = `${baseUrl}/uploads/videos/${videoFile.filename}`;
        }
        if (tags.length > 0) {
            data.tags = tags;
        }

        const newImage = await galleryService.createGalleryImage(data);
        res.status(201).json(newImage);
    } catch (err) {
        next(err);
    }
};

const addLikeController = async (req, res, next) => {
    try {
        const { imageId } = req.params;
        const userId = req.user._id;
        await galleryService.addLike(userId, imageId);
        res.status(200).json({ message: 'Like adicionado.' });
    } catch (err) {
        next(err);
    }
};

const removeLikeController = async (req, res, next) => {
    try {
        const { imageId } = req.params;
        const userId = req.user._id;
        await galleryService.removeLike(userId, imageId);
        res.status(200).json({ message: 'Like removido.' });
    } catch (err) {
        next(err);
    }
};

module.exports = { getGalleryController, createGalleryController, addLikeController, removeLikeController };
