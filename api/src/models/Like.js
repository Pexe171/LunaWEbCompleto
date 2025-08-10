const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    imageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', required: true },
    createdAt: { type: Date, default: Date.now }
});

likeSchema.index({ userId: 1, imageId: 1 }, { unique: true });

module.exports = mongoose.model('Like', likeSchema);

