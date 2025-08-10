const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 3333,
    jwt: {
        secret: process.env.JWT_SECRET || 'supersecret',
        accessExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
        refreshExpiresInDays: parseInt(process.env.JWT_REFRESH_EXPIRES_IN_DAYS || '7', 10)
    },
    licenseDays: parseInt(process.env.LICENSE_DAYS || '30', 10),
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/lunaweb'
};
