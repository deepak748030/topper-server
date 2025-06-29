import app from './app';
import { config } from './config/env';
import { connectDB } from './config/db';
import { logger } from './utils/logger';

const start = async () => {
    await connectDB();
    app.listen(config.port, () =>
        logger.info(`Server listening on http://localhost:${config.port}`)
    );
};
start();
