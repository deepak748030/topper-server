import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { sendResponse } from '../../../utils/response';
import {
    submitContestResult,
    getResultsByContest,
    getUserResult,
} from '../services/contestResult.service';

export const submitResultCtrl = asyncHandler(async (req: Request, res: Response) => {
    const { userId, contestId, answers, timeTakenInSeconds } = req.body;

    if (!userId || !contestId || !answers || timeTakenInSeconds == null) {
        throw new Error('All fields are required');
    }

    const result = await submitContestResult(userId, contestId, answers, timeTakenInSeconds);
    sendResponse(res, true, 'Result submitted', result);
});

export const getContestResultsCtrl = asyncHandler(async (req, res) => {
    const contestId = req.params.contestId;
    const results = await getResultsByContest(contestId);
    sendResponse(res, true, 'Contest Results', results);
});

export const getUserContestResultCtrl = asyncHandler(async (req, res) => {
    const { userId, contestId } = req.params;
    const result = await getUserResult(userId, contestId);
    sendResponse(res, true, 'User Result', result);
});
