import mongoose, { Schema, Document } from 'mongoose';

export interface IAnswer {
    questionId: mongoose.Types.ObjectId;
    selectedAnswer: string;
    isCorrect: boolean;
}

export interface IContestResult extends Document {
    userId: mongoose.Types.ObjectId;
    contestId: mongoose.Types.ObjectId;
    answers: IAnswer[];
    totalCorrect: number;
    totalScore: number;
    timeTakenInSeconds: number;
    rank?: number;
}

const contestResultSchema = new Schema<IContestResult>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        contestId: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
        answers: [
            {
                questionId: { type: Schema.Types.ObjectId, ref: 'Quiz', required: true },
                selectedAnswer: { type: String, required: true },
                isCorrect: { type: Boolean, default: false },
            },
        ],
        totalCorrect: { type: Number, default: 0 },
        totalScore: { type: Number, default: 0 },
        timeTakenInSeconds: { type: Number, required: true },
        rank: { type: Number, default: null },
    },
    { timestamps: true }
);

contestResultSchema.index({ userId: 1, contestId: 1 }, { unique: true });

export const ContestResult = mongoose.model<IContestResult>('ContestResult', contestResultSchema);
