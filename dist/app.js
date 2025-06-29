"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = __importDefault(require("./api/v1/routes/user.routes"));
const wallet_routes_1 = __importDefault(require("./api/v1/routes/wallet.routes"));
const contest_routes_1 = __importDefault(require("./api/v1/routes/contest.routes"));
const contestParticipation_routes_1 = __importDefault(require("./api/v1/routes/contestParticipation.routes"));
const transaction_routes_1 = __importDefault(require("./api/v1/routes/transaction.routes"));
const quiz_routes_1 = __importDefault(require("./api/v1/routes/quiz.routes"));
const contestResult_routes_1 = __importDefault(require("./api/v1/routes/contestResult.routes"));
const logger_1 = require("./utils/logger");
const apiError_1 = require("./utils/apiError");
const response_1 = require("./utils/response");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = require("./swagger/swagger.config");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '..', 'uploads')));
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.swaggerSpec));
app.use('/api/v1/users', user_routes_1.default);
app.use('/api/v1/wallets', wallet_routes_1.default);
app.use('/api/v1/contests', contest_routes_1.default);
app.use('/api/v1/contest-participation', contestParticipation_routes_1.default);
app.use('/api/v1/transactions', transaction_routes_1.default);
app.use('/api/v1/quizzes', quiz_routes_1.default);
app.use('/api/v1/contest-result', contestResult_routes_1.default);
// 404 handler
app.use((_req, _res, next) => {
    next(new apiError_1.ApiError(404, 'Not Found'));
});
// Global error handler
app.use((err, _req, res, _next) => {
    logger_1.logger.error(err);
    (0, response_1.sendResponse)(res, false, err.message);
});
exports.default = app;
