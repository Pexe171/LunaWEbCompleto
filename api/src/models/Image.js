const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    videoUrl: { type: String },
    description: { type: String },
    artist: { type: String },
    technique: { type: String },
    tags: [{ type: String }],
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
        index: true
    },
    moderationNotes: { type: String },
    reviewedAt: { type: Date },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submittedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);

