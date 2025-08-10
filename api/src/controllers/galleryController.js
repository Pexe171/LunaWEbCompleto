const galleryService = require('../services/galleryService');
const { logger } = require('../config/logger');

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
        const newImage = await galleryService.createGalleryImage(req.body);
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
