"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllContestsCtrl = exports.deleteContestCtrl = exports.updateContestCtrl = exports.createContestCtrl = void 0;
const asyncHandler_1 = require("../../../utils/asyncHandler");
const apiError_1 = require("../../../utils/apiError");
const response_1 = require("../../../utils/response");
const contest_service_1 = require("../services/contest.service");
exports.createContestCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = req.body;
    data.spotsLeft = data.totalSpots;
    data.contestShareCode = Math.random().toString(36).substring(2, 10);
    const contest = await (0, contest_service_1.createContest)(data);
    (0, response_1.sendResponse)(res, true, 'Contest created', contest);
});
exports.updateContestCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const contest = await (0, contest_service_1.updateContest)(req.params.id, req.body);
    if (!contest)
        throw new apiError_1.ApiError(404, 'Contest not found');
    (0, response_1.sendResponse)(res, true, 'Contest updated', contest);
});
exports.deleteContestCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const contest = await (0, contest_service_1.deleteContest)(req.params.id);
    if (!contest)
        throw new apiError_1.ApiError(404, 'Contest not found');
    (0, response_1.sendResponse)(res, true, 'Contest deleted', contest);
});
exports.getAllContestsCtrl = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const contests = await (0, contest_service_1.getAllContests)();
    (0, response_1.sendResponse)(res, true, 'All contests fetched', contests);
});
