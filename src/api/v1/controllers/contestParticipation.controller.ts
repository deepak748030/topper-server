// src/api/v1/controllers/contestParticipation.controller.ts
import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { sendResponse } from '../../../utils/response';
import {
    joinContest,
    getAllContestParticipants,
    getContestParticipantsByContest,
    getUserParticipations,
} from '../services/contestParticipation.service';

export const joinContestCtrl = asyncHandler(async (req: Request, res: Response) => {
    const { userId, contestId } = req.body;

    const result = await joinContest(userId, contestId);
    sendResponse(res, true, 'Joined contest successfully', result);
});

export const getAllParticipantsCtrl = asyncHandler(async (_req, res) => {
    const data = await getAllContestParticipants();
    sendResponse(res, true, 'All contest participations', data);
});

export const getParticipantsByContestCtrl = asyncHandler(async (req, res) => {
    const data = await getContestParticipantsByContest(req.params.contestId);
    sendResponse(res, true, 'Participants of contest', data);
});

export const getUserParticipationsCtrl = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const participations = await getUserParticipations(userId);
    sendResponse(res, true, 'User participation fetched successfully', participations);
});