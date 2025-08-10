const galleryService = require('../services/galleryService');
const { logger } = require('../config/logger');

const getGalleryController = async (req, res, next) => {
    try {
        const { tags, search, page, limit } = req.query;
        const filters = {
            tags: tags ? tags.split(',') : undefined,
            search,
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
        const authorId = req.user._id;
        const authorName = req.user.name || req.user.email;
        const newImage = await galleryService.createGalleryImage({ ...req.body, authorId, authorName });
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
