// src/api/v1/services/transaction.service.ts
import { Transaction } from '../models/transaction.model';

export const createTransaction = async (data: {
    userId: string;
    type: 'add' | 'deduct';
    amount: number;
    message: string;
}) => Transaction.create(data);

export const getTransactionsByUserId = async (userId: string) =>
    Transaction.find({ userId }).sort({ createdAt: -1 });
