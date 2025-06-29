"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), envFile) });
exports.config = {
    port: Number(process.env.PORT) || 5000,
    env: process.env.NODE_ENV || 'development',
    mongoUri: process.env.MONGO_URI || '',
    jwtSecret: process.env.JWT_SECRET || '',
};
