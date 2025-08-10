const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config');
const { logger } = require('./config/logger');
const { ensureAdminUser } = require('./utils/ensureAdmin');

mongoose.connect(config.mongoUri)
    .then(async () => {
        await ensureAdminUser();
        app.listen(config.port, () => {
            logger.info(`Server running on port ${config.port}`);
        });
    })
    .catch(err => {
        logger.error(`MongoDB connection error: ${err.message}`);
    });

