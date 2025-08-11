const galleryService = require('../services/galleryService');
const fs = require('fs');
const path = require('path');

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
        const folderName = req.savedImageFolder || '';
        const imageUrl = `${baseUrl}/uploads/images/${folderName}/${imageFile.filename}`;
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

const deleteGalleryController = async (req, res, next) => {
    try {
        const { imageId } = req.params;
        const deletedImage = await galleryService.deleteGalleryImage(imageId);
        if (!deletedImage) {
            return res.status(404).json({ message: 'Imagem não encontrada.' });
        }

        if (deletedImage.url) {
            try {
                const imageUrlPath = new URL(deletedImage.url).pathname; // /uploads/images/<folder>/<file>
                const imagePath = path.join(__dirname, '..', '..', imageUrlPath);
                fs.unlink(imagePath, () => {
                    const dir = path.dirname(imagePath);
                    fs.readdir(dir, (err, files) => {
                        if (!err && files.length === 0) {
                            fs.rmdir(dir, () => {});
                        }
                    });
                });
            } catch (err) {
                // ignore errors during file cleanup
            }
        }
        if (deletedImage.videoUrl) {
            const videoFile = path.basename(deletedImage.videoUrl);
            const videoPath = path.join(__dirname, '..', '..', 'uploads', 'videos', videoFile);
            fs.unlink(videoPath, () => {});
        }

        res.status(200).json({ message: 'Imagem removida.' });
    } catch (err) {
        next(err);
    }
};
module.exports = { getGalleryController, createGalleryController, addLikeController, removeLikeController, deleteGalleryController };
