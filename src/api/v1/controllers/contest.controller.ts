import { Quiz } from '../models/quiz.model'; // make sure this path is correct
import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ApiError } from '../../../utils/apiError';
import { sendResponse } from '../../../utils/response';
import {
    getUpcomingContests,
    getLiveContests,
    getCompletedContests,
    createContest,
    updateContest,
    deleteContest,
    getAllContests
} from '../services/contest.service';

export const createContestCtrl = asyncHandler(async (req: Request, res: Response) => {
    const data = req.body;
    data.spotsLeft = data.totalSpots;
    data.contestShareCode = Math.random().toString(36).substring(2, 10);
    const contest = await createContest(data);
    sendResponse(res, true, 'Contest created', contest);
});

export const updateContestCtrl = asyncHandler(async (req: Request, res: Response) => {
    const contest = await updateContest(req.params.id, req.body);
    if (!contest) throw new ApiError(404, 'Contest not found');
    sendResponse(res, true, 'Contest updated', contest);
});


export const deleteContestCtrl = asyncHandler(async (req: Request, res: Response) => {
    const contest = await deleteContest(req.params.id);
    if (!contest) throw new ApiError(404, 'Contest not found');

    // 🧹 Delete all quizzes associated with this contest
    await Quiz.deleteMany({ contestId: contest._id });

    sendResponse(res, true, 'Contest and related quizzes deleted', contest);
});

export const getAllContestsCtrl = asyncHandler(async (_req: Request, res: Response) => {
    const contests = await getAllContests();
    sendResponse(res, true, 'All contests fetched', contests);
});

export const getUpcomingContestsCtrl = asyncHandler(async (_req, res) => {
    const contests = await getUpcomingContests();
    sendResponse(res, true, 'Upcoming contests fetched', contests);
});

export const getLiveContestsCtrl = asyncHandler(async (_req, res) => {
    const contests = await getLiveContests();
    sendResponse(res, true, 'Live contests fetched', contests);
});

export const getCompletedContestsCtrl = asyncHandler(async (_req, res) => {
    const contests = await getCompletedContests();
    sendResponse(res, true, 'Completed contests fetched', contests);
});
