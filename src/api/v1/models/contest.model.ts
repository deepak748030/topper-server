// src/api/v1/models/contest.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IContest extends Document {
  contestName: string;
  entryFees: number;
  type: 'public' | 'private' | 'multiplayer';
  startTime: string;
  endTime: string;
  date: string;
  totalQuestions: number;
  prizePool: number;
  totalSpots: number;
  spotsLeft: number;
  contestShareCode: string;
  winnerPrizes: Record<string, number>;
  creatorName?: string; // optional
}

const ContestSchema = new Schema<IContest>(
  {
    contestName: { type: String, required: true },
    entryFees: { type: Number, required: true },
    type: { type: String, enum: ['public', 'private', 'multiplayer'], required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    date: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    prizePool: { type: Number, required: true },
    totalSpots: { type: Number, required: true },
    spotsLeft: { type: Number, required: true },
    contestShareCode: { type: String, required: true, unique: true },
    winnerPrizes: { type: Map, of: Number, required: true },
    creatorName: { type: String, default: '' }
  },
  {
    timestamps: true
  }
);

export const Contest = mongoose.model<IContest>('Contest', ContestSchema);

