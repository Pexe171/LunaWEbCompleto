const express = require('express');
const authRoutes = require('./authRoutes');
const galleryRoutes = require('./galleryRoutes');
const userRoutes = require('./userRoutes');

const apiRouter = express.Router();

// Rota simples para verificar se a API está respondendo
apiRouter.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

apiRouter.use('/auth', authRoutes);
apiRouter.use('/gallery', galleryRoutes);
apiRouter.use('/users', userRoutes);

module.exports = apiRouter;
