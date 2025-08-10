const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    artist: { type: String },
    technique: { type: String },
    tags: [{ type: String }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Image', imageSchema);

