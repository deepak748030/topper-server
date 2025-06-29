"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
const db_1 = require("./config/db");
const logger_1 = require("./utils/logger");
const start = async () => {
    await (0, db_1.connectDB)();
    app_1.default.listen(env_1.config.port, () => logger_1.logger.info(`Server listening on http://localhost:${env_1.config.port}`));
};
start();
