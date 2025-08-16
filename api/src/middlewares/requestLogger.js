const crypto = require('crypto');
const { logger } = require('../config/logger');
const metrics = require('../utils/metrics');

function requestLogger(req, res, next) {
  req.requestId = crypto.randomUUID();
  const start = process.hrtime();
  res.setHeader('X-Request-Id', req.requestId);

  res.on('finish', () => {
    const diff = process.hrtime(start);
    const latency = diff[0] * 1000 + diff[1] / 1e6;
    const route = req.route ? req.baseUrl + req.route.path : req.originalUrl;

    logger.info({
      requestId: req.requestId,
      method: req.method,
      route,
      status: res.statusCode,
      latency
    });

    metrics.record(route, latency, res.statusCode);
  });

  next();
}

module.exports = { requestLogger };
