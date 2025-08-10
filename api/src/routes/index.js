const express = require('express');
const authRoutes = require('./authRoutes');
const licenseRoutes = require('./licenseRoutes');
const galleryRoutes = require('./galleryRoutes');
const userRoutes = require('./userRoutes');

const apiRouter = express.Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/license', licenseRoutes);
apiRouter.use('/gallery', galleryRoutes);
apiRouter.use('/users', userRoutes);

module.exports = apiRouter;
