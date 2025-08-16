const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const apiRoutes = require('./routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger } = require('./middlewares/requestLogger');
const metrics = require('./utils/metrics');
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
app.use(requestLogger);

app.get('/healthz', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/readyz', (req, res) => {
  const state = mongoose.connection.readyState;
  let status = 'Fail';
  let code = 500;
  if (state === 1) {
    status = 'OK';
    code = 200;
  } else if (state === 2 || state === 3) {
    status = 'Degraded';
    code = 503;
  }
  res.status(code).json({ status });
});

app.get('/metrics', (req, res) => {
  res.json(metrics.summary());
});

app.use('/api/v1', apiRoutes);

app.use(errorHandler);

module.exports = app;

