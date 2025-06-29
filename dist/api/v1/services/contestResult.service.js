"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserResult = exports.getResultsByContest = exports.submitContestResult = void 0;
const contestResult_model_1 = require("../models/contestResult.model");
const quiz_model_1 = require("../models/quiz.model");
const apiError_1 = require("../../../utils/apiError");
const submitContestResult = async (userId, contestId, answers, timeTakenInSeconds) => {
    const existing = await contestResult_model_1.ContestResult.findOne({ userId, contestId });
    if (existing)
        throw new apiError_1.ApiError(400, 'Already submitted result for this contest');
    let totalCorrect = 0;
    const processedAnswers = [];
    for (const ans of answers) {
        const quiz = await quiz_model_1.Quiz.findById(ans.questionId);
        if (!quiz)
            throw new apiError_1.ApiError(404, `Quiz not found: ${ans.questionId}`);
        const isCorrect = quiz.correctAnswer === ans.selectedAnswer;
        if (isCorrect)
            totalCorrect++;
        processedAnswers.push({
            questionId: quiz._id,
            selectedAnswer: ans.selectedAnswer,
            isCorrect,
        });
    }
    const totalScore = totalCorrect * 10; // 10 points per correct
    const result = await contestResult_model_1.ContestResult.create({
        userId,
        contestId,
        answers: processedAnswers,
        totalCorrect,
        totalScore,
        timeTakenInSeconds,
    });
    return result;
};
exports.submitContestResult = submitContestResult;
const getResultsByContest = async (contestId) => contestResult_model_1.ContestResult.find({ contestId }).sort([
    ['totalScore', -1],
    ['timeTakenInSeconds', 1]
]);
exports.getResultsByContest = getResultsByContest;
const getUserResult = async (userId, contestId) => contestResult_model_1.ContestResult.findOne({ userId, contestId });
exports.getUserResult = getUserResult;
