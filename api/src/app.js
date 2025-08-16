const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const config = require('./config');

const app = express();

// Disable HTTP caching to avoid 304 responses with empty bodies
app.disable('etag');
app.disable('x-powered-by');
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.use(helmet());

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || config.cors.origins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

app.use(
  express.json({ limit: config.payloadLimit })
);
app.use(
  express.urlencoded({ extended: true, limit: config.payloadLimit })
);

const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max
});
app.use(limiter);
app.use(morgan('dev'));

app.use('/api/v1', apiRoutes);

app.use(errorHandler);

module.exports = app;

