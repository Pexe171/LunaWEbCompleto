const app = require('./app');
const { connectDB } = require('./config/db');
const config = require('./config');
const { logger } = require('./config/logger');

const start = async () => {
    try {
        await connectDB();
        app.listen(config.port, () => {
            logger.info(`Servidor rodando na porta ${config.port}`);
        });
    } catch (err) {
        logger.error(`Falha ao iniciar o servidor: ${err.message}`);
        process.exit(1);
    }
};

start();
