// src/api/v1/routes/transaction.routes.ts
import { Router } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { getTransactionsCtrl } from '../controllers/transaction.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction History
 */

/**
 * @swagger
 * /transactions/{userId}:
 *   get:
 *     tags: [Transactions]
 *     summary: Get all transactions of a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get('/:userId', asyncHandler(getTransactionsCtrl));

export default router;
