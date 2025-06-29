import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ApiError } from '../../../utils/apiError';
import { sendResponse } from '../../../utils/response';
import {
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
    sendResponse(res, true, 'Contest deleted', contest);
});

export const getAllContestsCtrl = asyncHandler(async (_req: Request, res: Response) => {
    const contests = await getAllContests();
    sendResponse(res, true, 'All contests fetched', contests);
});


