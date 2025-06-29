"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuizCtrl = exports.updateQuizCtrl = exports.getQuizByContestIdCtrl = exports.createQuizCtrl = void 0;
const asyncHandler_1 = require("../../../utils/asyncHandler");
const response_1 = require("../../../utils/response");
const quiz_service_1 = require("../services/quiz.service");
const apiError_1 = require("../../../utils/apiError");
/**
 * @route POST /quizzes
 * @desc Create a new quiz for a contest
 */
exports.createQuizCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { question, option1, option2, option3, option4, correctAnswer, contestId, } = req.body;
    if (!question || !option1 || !option2 || !option3 || !option4 || !correctAnswer || !contestId) {
        throw new apiError_1.ApiError(400, 'All fields except image are required');
    }
    const options = [option1, option2, option3, option4];
    const quizData = {
        question,
        options,
        correctAnswer,
        contestId,
        image: req.file ? `/uploads/${req.file.filename}` : undefined,
    };
    const quiz = await (0, quiz_service_1.createQuiz)(quizData);
    (0, response_1.sendResponse)(res, true, 'Quiz created successfully', quiz);
});
/**
 * @route GET /quizzes/:contestId
 * @desc Get all quizzes for a given contest
 */
exports.getQuizByContestIdCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { contestId } = req.params;
    if (!contestId)
        throw new apiError_1.ApiError(400, 'contestId is required');
    const quizzes = await (0, quiz_service_1.getQuizzesByContestId)(contestId);
    (0, response_1.sendResponse)(res, true, 'Fetched all quizzes for contest', quizzes);
});
/**
 * @route PATCH /quizzes/:id
 * @desc Update a quiz by ID
 */
exports.updateQuizCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!id)
        throw new apiError_1.ApiError(400, 'Quiz ID is required');
    const updatedData = { ...req.body };
    if (req.file) {
        updatedData.image = `/uploads/${req.file.filename}`;
    }
    const updated = await (0, quiz_service_1.updateQuiz)(id, updatedData);
    if (!updated)
        throw new apiError_1.ApiError(404, 'Quiz not found');
    (0, response_1.sendResponse)(res, true, 'Quiz updated successfully', updated);
});
/**
 * @route DELETE /quizzes/:id
 * @desc Delete a quiz by ID
 */
exports.deleteQuizCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { id } = req.params;
    if (!id)
        throw new apiError_1.ApiError(400, 'Quiz ID is required');
    const deleted = await (0, quiz_service_1.deleteQuiz)(id);
    if (!deleted)
        throw new apiError_1.ApiError(404, 'Quiz not found');
    (0, response_1.sendResponse)(res, true, 'Quiz deleted successfully');
});
