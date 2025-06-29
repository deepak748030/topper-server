import mongoose, { Schema, Document } from 'mongoose';

export interface IContestParticipation extends Document {
    userId: mongoose.Types.ObjectId;
    contestId: mongoose.Types.ObjectId;
    amount: number;
    joinedAt?: Date;
}

const contestParticipationSchema = new Schema<IContestParticipation>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        contestId: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
        amount: { type: Number, required: true }, // 💰 amount spent when joining
        joinedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export const ContestParticipation = mongoose.model<IContestParticipation>(
    'ContestParticipation',
    contestParticipationSchema
);
