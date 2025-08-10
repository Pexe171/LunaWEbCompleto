const commentService = require('../services/commentService');

const addCommentController = async (req, res, next) => {
    try {
        const { imageId } = req.params;
        const userId = req.user._id;
        const { text } = req.body;
        const comment = await commentService.addComment(userId, imageId, text);
        res.status(201).json(comment);
    } catch (err) {
        next(err);
    }
};

const getCommentsController = async (req, res, next) => {
    try {
        const { imageId } = req.params;
        const comments = await commentService.getComments(imageId);
        res.json(comments);
    } catch (err) {
        next(err);
    }
};

module.exports = { addCommentController, getCommentsController };
