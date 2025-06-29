"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuiz = exports.updateQuiz = exports.getQuizzesByContestId = exports.createQuiz = void 0;
const quiz_model_1 = require("../models/quiz.model");
const apiError_1 = require("../../../utils/apiError");
const createQuiz = async (data, imagePath) => {
    const payload = {
        ...data,
        image: imagePath || undefined,
    };
    return await quiz_model_1.Quiz.create(payload);
};
exports.createQuiz = createQuiz;
const getQuizzesByContestId = async (contestId) => {
    return await quiz_model_1.Quiz.find({ contestId });
};
exports.getQuizzesByContestId = getQuizzesByContestId;
const updateQuiz = async (id, data, imagePath) => {
    const quiz = await quiz_model_1.Quiz.findById(id);
    if (!quiz)
        throw new apiError_1.ApiError(404, 'Quiz not found');
    if (imagePath)
        data.image = imagePath;
    Object.assign(quiz, data);
    return await quiz.save();
};
exports.updateQuiz = updateQuiz;
const deleteQuiz = async (id) => {
    const quiz = await quiz_model_1.Quiz.findById(id);
    if (!quiz)
        throw new apiError_1.ApiError(404, 'Quiz not found');
    return await quiz.deleteOne();
};
exports.deleteQuiz = deleteQuiz;
