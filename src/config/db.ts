import mongoose from 'mongoose';
import { config } from './env';
import { logger } from '../utils/logger';

const MAX_RETRIES = 5;
let retries = 0;

export const connectDB = async () => {
    while (retries < MAX_RETRIES) {
        try {
            await mongoose.connect(config.mongoUri);
            logger.info('MongoDB connected');
            break;
        } catch (err: any) {
            retries++;
            logger.error(`MongoDB connection failed (${retries}/${MAX_RETRIES}): ${err.message}`);
            await new Promise(res => setTimeout(res, 2 ** retries * 1000));
        }
    }
    if (retries === MAX_RETRIES) {
        logger.error('Could not connect to MongoDB after multiple attempts');
        process.exit(1);
    }
};
