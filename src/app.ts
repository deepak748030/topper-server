import express from 'express';
import cors from 'cors'; // ✅ Import cors
import userRoutes from './api/v1/routes/user.routes';
import walletRoutes from './api/v1/routes/wallet.routes';
import contestRoutes from './api/v1/routes/contest.routes';
import contestParticipationRoutes from './api/v1/routes/contestParticipation.routes';
import transactionRoutes from './api/v1/routes/transaction.routes';
import quizRoutes from './api/v1/routes/quiz.routes';
import contestResultRoutes from './api/v1/routes/contestResult.routes';
import { connectDB } from './config/db';
import { config } from './config/env';
import { logger } from './utils/logger';
import { ApiError } from './utils/apiError';
import { sendResponse } from './utils/response';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/swagger.config';
import path from 'path';

const app = express();

app.use(cors()); // ✅ Enable CORS (allow all origins)
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/wallets', walletRoutes);
app.use('/api/v1/contests', contestRoutes);
app.use('/api/v1/contest-participation', contestParticipationRoutes);
app.use('/api/v1/transactions', transactionRoutes);
app.use('/api/v1/quizzes', quizRoutes);
app.use('/api/v1/contest-result', contestResultRoutes);

// 404 handler
app.use((_req, _res, next) => {
    next(new ApiError(404, 'Not Found'));
});

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: any) => {
    logger.error(err);
    sendResponse(res, false, err.message);
});

export default app;
