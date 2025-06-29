import { ContestResult } from '../models/contestResult.model';
import { Quiz } from '../models/quiz.model';
import { ApiError } from '../../../utils/apiError';

export const submitContestResult = async (
    userId: string,
    contestId: string,
    answers: { questionId: string; selectedAnswer: string }[],
    timeTakenInSeconds: number
) => {
    const existing = await ContestResult.findOne({ userId, contestId });
    if (existing) throw new ApiError(400, 'Already submitted result for this contest');

    let totalCorrect = 0;
    const processedAnswers = [];

    for (const ans of answers) {
        const quiz = await Quiz.findById(ans.questionId);
        if (!quiz) throw new ApiError(404, `Quiz not found: ${ans.questionId}`);

        const isCorrect = quiz.correctAnswer === ans.selectedAnswer;
        if (isCorrect) totalCorrect++;

        processedAnswers.push({
            questionId: quiz._id,
            selectedAnswer: ans.selectedAnswer,
            isCorrect,
        });
    }

    const totalScore = totalCorrect * 10; // 10 points per correct
    const result = await ContestResult.create({
        userId,
        contestId,
        answers: processedAnswers,
        totalCorrect,
        totalScore,
        timeTakenInSeconds,
    });

    return result;
};

export const getResultsByContest = async (contestId: string) =>
    ContestResult.find({ contestId }).sort([
        ['totalScore', -1],
        ['timeTakenInSeconds', 1]
    ]);

export const getUserResult = async (userId: string, contestId: string) =>
    ContestResult.findOne({ userId, contestId });
