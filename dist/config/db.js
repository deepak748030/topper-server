"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const logger_1 = require("../utils/logger");
const MAX_RETRIES = 5;
let retries = 0;
const connectDB = async () => {
    while (retries < MAX_RETRIES) {
        try {
            await mongoose_1.default.connect(env_1.config.mongoUri);
            logger_1.logger.info('MongoDB connected');
            break;
        }
        catch (err) {
            retries++;
            logger_1.logger.error(`MongoDB connection failed (${retries}/${MAX_RETRIES}): ${err.message}`);
            await new Promise(res => setTimeout(res, 2 ** retries * 1000));
        }
    }
    if (retries === MAX_RETRIES) {
        logger_1.logger.error('Could not connect to MongoDB after multiple attempts');
        process.exit(1);
    }
};
exports.connectDB = connectDB;
