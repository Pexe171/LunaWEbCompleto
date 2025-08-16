const env = process.env.NODE_ENV || 'development';

const config = {
    env,
    port: process.env.PORT || 3333,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/auth_app',
    jwt: {
        secret: process.env.JWT_SECRET || 'change-in-prod',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'change-in-prod-too',
        accessExpires: process.env.ACCESS_TOKEN_EXPIRES || '15m',
        refreshExpires: process.env.REFRESH_TOKEN_EXPIRES || '7d'
    },
    logLevel: process.env.LOG_LEVEL || 'info',
    cors: {
        origins: (process.env.CORS_ORIGINS || '')
            .split(',')
            .map(o => o.trim())
            .filter(Boolean)
    },
    payloadLimit: process.env.PAYLOAD_LIMIT || '100kb',
    rateLimit: {
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
        max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10)
    }
};

module.exports = config;

