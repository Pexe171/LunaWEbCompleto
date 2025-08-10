const Image = require('../models/Image');
const Like = require('../models/Like');

const createGalleryImage = async (imageData) => {
    const newImage = new Image(imageData);
    await newImage.save();
    return newImage;
};

const getGalleryImages = async (filters) => {
    let { tags, search, technique, artist, date, page = 1, limit = 10 } = filters;

    // Ensure page and limit are valid positive integers
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);
    if (isNaN(page) || page < 1) page = 1;
    if (isNaN(limit) || limit < 1) limit = 10;

    const query = {};

    if (tags && tags.length > 0) {
        query.tags = { $in: tags };
    }
    if (search) {
        query.title = { $regex: search, $options: 'i' };
    }
    if (technique) {
        query.technique = technique;
    }
    if (artist) {
        query.artist = artist;
    }
    if (date) {
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        query.createdAt = { $gte: start, $lte: end };
    }

    const totalCount = await Image.countDocuments(query);
    const images = await Image.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    return {
        images,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page
    };
};

const addLike = async (userId, imageId) => {
    await Like.findOneAndUpdate(
        { userId, imageId },
        { userId, imageId, createdAt: new Date() },
        { upsert: true, new: true }
    );
};

const removeLike = async (userId, imageId) => {
    await Like.deleteOne({ userId, imageId });
};

module.exports = { createGalleryImage, getGalleryImages, addLike, removeLike };
