const Comment = require('../models/Comment');

const addComment = async (userId, imageId, text) => {
    const comment = new Comment({ userId, imageId, text });
    await comment.save();
    return comment;
};

const getComments = async (imageId) => {
    return Comment.find({ imageId })
        .sort({ createdAt: -1 })
        .populate('userId', 'name email avatarUrl');
};

module.exports = { addComment, getComments };
