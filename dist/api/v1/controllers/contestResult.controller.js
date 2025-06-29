"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserContestResultCtrl = exports.getContestResultsCtrl = exports.submitResultCtrl = void 0;
const asyncHandler_1 = require("../../../utils/asyncHandler");
const response_1 = require("../../../utils/response");
const contestResult_service_1 = require("../services/contestResult.service");
exports.submitResultCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId, contestId, answers, timeTakenInSeconds } = req.body;
    if (!userId || !contestId || !answers || timeTakenInSeconds == null) {
        throw new Error('All fields are required');
    }
    const result = await (0, contestResult_service_1.submitContestResult)(userId, contestId, answers, timeTakenInSeconds);
    (0, response_1.sendResponse)(res, true, 'Result submitted', result);
});
exports.getContestResultsCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const contestId = req.params.contestId;
    const results = await (0, contestResult_service_1.getResultsByContest)(contestId);
    (0, response_1.sendResponse)(res, true, 'Contest Results', results);
});
exports.getUserContestResultCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId, contestId } = req.params;
    const result = await (0, contestResult_service_1.getUserResult)(userId, contestId);
    (0, response_1.sendResponse)(res, true, 'User Result', result);
});
