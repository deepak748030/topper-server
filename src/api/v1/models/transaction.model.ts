// src/api/v1/models/transaction.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
    userId: mongoose.Types.ObjectId;
    type: 'add' | 'deduct';
    amount: number;
    message: string;
    createdAt?: Date;
}

const transactionSchema = new Schema<ITransaction>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        type: { type: String, enum: ['add', 'deduct'], required: true },
        amount: { type: Number, required: true },
        message: { type: String, required: true },
    },
    { timestamps: true }
);

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);
