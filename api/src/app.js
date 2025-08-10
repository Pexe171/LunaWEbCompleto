const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const apiRoutes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const path = require('path');

const app = express();

// Disable HTTP caching to avoid 304 responses with empty bodies
app.disable('etag');
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use('/api/v1', apiRoutes);

app.use(errorHandler);

module.exports = app;

