// src/api/v1/controllers/transaction.controller.ts
import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { getTransactionsByUserId } from '../services/transaction.service';
import { sendResponse } from '../../../utils/response';

export const getTransactionsCtrl = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const transactions = await getTransactionsByUserId(userId);
    sendResponse(res, true, 'Transactions fetched', transactions);
});
