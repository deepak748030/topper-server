// src/api/v1/models/quiz.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IQuiz extends Document {
    question: string;
    options: string[]; // Should always be length 4
    correctAnswer: string;
    image?: string;
    contestId: mongoose.Types.ObjectId;
}

const quizSchema = new Schema<IQuiz>(
    {
        question: { type: String, required: true },
        options: {
            type: [String],
            required: true
        },
        correctAnswer: { type: String, required: true },
        image: { type: String },
        contestId: { type: Schema.Types.ObjectId, ref: 'Contest', required: true },
    },
    { timestamps: true }
);

export const Quiz = mongoose.model<IQuiz>('Quiz', quizSchema);
