// src/api/v1/models/wallet.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IWallet extends Document {
    userId: mongoose.Types.ObjectId;
    bonusWallet: number;
    depositWallet: number;
    winningWallet: number;
}

const walletSchema = new Schema<IWallet>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        bonusWallet: {
            type: Number,
            default: 0,
        },
        depositWallet: {
            type: Number,
            default: 0,
        },
        winningWallet: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Wallet = mongoose.model<IWallet>('Wallet', walletSchema);
