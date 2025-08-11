const galleryService = require('../services/galleryService');

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
        const tags = req.body.tags
            ? req.body.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
            : [];

        const data = {
            title: req.body.title,
            url: req.body.url,
        };
        if (req.body.description) {
            data.description = req.body.description;
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

const deleteGalleryController = async (req, res, next) => {
    try {
        const { imageId } = req.params;
        const deletedImage = await galleryService.deleteGalleryImage(imageId);
        if (!deletedImage) {
            return res.status(404).json({ message: 'Imagem não encontrada.' });
        }

        res.status(200).json({ message: 'Imagem removida.' });
    } catch (err) {
        next(err);
    }
};
module.exports = { getGalleryController, createGalleryController, addLikeController, removeLikeController, deleteGalleryController };
