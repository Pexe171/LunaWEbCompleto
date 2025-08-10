const env = process.env.NODE_ENV || 'development';

const config = {
    env,
    port: process.env.PORT || 3333,
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/auth_licensing',
    jwt: {
        secret: process.env.JWT_SECRET || 'change-in-prod',
        refreshSecret: process.env.JWT_REFRESH_SECRET || 'change-in-prod-too',
        accessExpires: process.env.ACCESS_TOKEN_EXPIRES || '15m',
        refreshExpires: process.env.REFRESH_TOKEN_EXPIRES || '7d'
    },
    licenseDays: parseInt(process.env.LICENSE_DAYS, 10) || 30,
    logLevel: process.env.LOG_LEVEL || 'info'
};

module.exports = config;

