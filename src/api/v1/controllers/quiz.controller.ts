import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { sendResponse } from '../../../utils/response';
import {
    createQuiz,
    deleteQuiz,
    getQuizzesByContestId,
    updateQuiz,
} from '../services/quiz.service';
import { ApiError } from '../../../utils/apiError';

/**
 * @route POST /quizzes
 * @desc Create a new quiz for a contest
 */
export const createQuizCtrl = asyncHandler(async (req: Request, res: Response) => {
    const {
        question,
        option1,
        option2,
        option3,
        option4,
        correctAnswer,
        contestId,
    } = req.body;

    if (!question || !option1 || !option2 || !option3 || !option4 || !correctAnswer || !contestId) {
        throw new ApiError(400, 'All fields except image are required');
    }

    const options = [option1, option2, option3, option4];

    const quizData = {
        question,
        options,
        correctAnswer,
        contestId,
        image: req.file ? `/uploads/${req.file.filename}` : undefined,
    };

    const quiz = await createQuiz(quizData);
    sendResponse(res, true, 'Quiz created successfully', quiz);
});

/**
 * @route GET /quizzes/:contestId
 * @desc Get all quizzes for a given contest
 */
export const getQuizByContestIdCtrl = asyncHandler(async (req: Request, res: Response) => {
    const { contestId } = req.params;

    if (!contestId) throw new ApiError(400, 'contestId is required');

    const quizzes = await getQuizzesByContestId(contestId);
    sendResponse(res, true, 'Fetched all quizzes for contest', quizzes);
});

/**
 * @route PATCH /quizzes/:id
 * @desc Update a quiz by ID
 */
export const updateQuizCtrl = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) throw new ApiError(400, 'Quiz ID is required');

    const updatedData = { ...req.body };

    if (req.file) {
        updatedData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await updateQuiz(id, updatedData);
    if (!updated) throw new ApiError(404, 'Quiz not found');

    sendResponse(res, true, 'Quiz updated successfully', updated);
});

/**
 * @route DELETE /quizzes/:id
 * @desc Delete a quiz by ID
 */
export const deleteQuizCtrl = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) throw new ApiError(400, 'Quiz ID is required');

    const deleted = await deleteQuiz(id);
    if (!deleted) throw new ApiError(404, 'Quiz not found');

    sendResponse(res, true, 'Quiz deleted successfully');
});
