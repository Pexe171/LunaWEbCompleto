const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const { logger } = require('./config/logger');

mongoose.connect(config.mongoUri)
    .then(() => {
        app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port}`);
        });
    })
    .catch(err => {
        logger.error(`MongoDB connection error: ${err.message}`);
    });

