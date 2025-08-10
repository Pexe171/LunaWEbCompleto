const Image = require('../models/Image');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

const createGalleryImage = async (imageData) => {
    const newImage = new Image(imageData);
    await newImage.save();
    return newImage;
};

const getGalleryImages = async (filters) => {
    const { tags, search, page = 1, limit = 10 } = filters;
    const query = {};

    if (tags && tags.length > 0) {
        query.tags = { $in: tags };
    }
    if (search) {
        query.$or = [
            { title: { $regex: search, $options: 'i' } },
            { authorName: { $regex: search, $options: 'i' } }
        ];
    }

    const totalCount = await Image.countDocuments(query);
    const images = await Image.find(query)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    const imagesWithCounts = await Promise.all(images.map(async (img) => {
        const likes = await Like.countDocuments({ imageId: img._id });
        const comments = await Comment.countDocuments({ imageId: img._id });
        return { ...img.toObject(), likes, comments };
    }));

    return {
        images: imagesWithCounts,
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
