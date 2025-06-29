// src/api/v1/models/contestParticipation.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Contest } from './contest.model';
import { Wallet } from './wallet.model';
import { ApiError } from '../../../utils/apiError';

export interface IContestParticipation extends Document {
    userId: mongoose.Types.ObjectId;
    contestId: mongoose.Types.ObjectId;
    joinedAt?: Date;
}

const contestParticipationSchema = new Schema<IContestParticipation>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        contestId: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
        joinedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const ContestParticipation = mongoose.model<IContestParticipation>(
    'ContestParticipation',
    contestParticipationSchema
);