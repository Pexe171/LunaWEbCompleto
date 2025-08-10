const mongoose = require('mongoose');
const config = require('.');

const connectDB = async () => {
    await mongoose.connect(config.mongoUri);
};

module.exports = { connectDB };
