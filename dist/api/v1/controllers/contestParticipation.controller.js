"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserParticipationsCtrl = exports.getParticipantsByContestCtrl = exports.getAllParticipantsCtrl = exports.joinContestCtrl = void 0;
const asyncHandler_1 = require("../../../utils/asyncHandler");
const response_1 = require("../../../utils/response");
const contestParticipation_service_1 = require("../services/contestParticipation.service");
exports.joinContestCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId, contestId } = req.body;
    const result = await (0, contestParticipation_service_1.joinContest)(userId, contestId);
    (0, response_1.sendResponse)(res, true, 'Joined contest successfully', result);
});
exports.getAllParticipantsCtrl = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const data = await (0, contestParticipation_service_1.getAllContestParticipants)();
    (0, response_1.sendResponse)(res, true, 'All contest participations', data);
});
exports.getParticipantsByContestCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = await (0, contestParticipation_service_1.getContestParticipantsByContest)(req.params.contestId);
    (0, response_1.sendResponse)(res, true, 'Participants of contest', data);
});
exports.getUserParticipationsCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const participations = await (0, contestParticipation_service_1.getUserParticipations)(userId);
    (0, response_1.sendResponse)(res, true, 'User participation fetched successfully', participations);
});
