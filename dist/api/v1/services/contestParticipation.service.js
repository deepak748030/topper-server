"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserParticipations = exports.getContestParticipantsByContest = exports.getAllContestParticipants = exports.joinContest = void 0;
const contestParticipation_model_1 = require("../models/contestParticipation.model");
const contest_model_1 = require("../models/contest.model");
const wallet_model_1 = require("../models/wallet.model");
const apiError_1 = require("../../../utils/apiError");
const transaction_service_1 = require("./transaction.service");
const joinContest = async (userId, contestId) => {
    const alreadyJoined = await contestParticipation_model_1.ContestParticipation.findOne({ userId, contestId });
    if (alreadyJoined)
        throw new apiError_1.ApiError(400, 'User already joined this contest');
    const contest = await contest_model_1.Contest.findById(contestId);
    if (!contest)
        throw new apiError_1.ApiError(404, 'Contest not found');
    if (contest.spotsLeft <= 0)
        throw new apiError_1.ApiError(400, 'No spots left');
    const wallet = await wallet_model_1.Wallet.findOne({ userId });
    if (!wallet)
        throw new apiError_1.ApiError(404, 'User wallet not found');
    const entryFee = contest.entryFees;
    let remaining = entryFee;
    const deduct = (walletPart) => {
        if (walletPart >= remaining) {
            const used = remaining;
            remaining = 0;
            return used;
        }
        else {
            const used = walletPart;
            remaining -= walletPart;
            return used;
        }
    };
    const bonusUsed = deduct(wallet.bonusWallet);
    const depositUsed = deduct(wallet.depositWallet);
    const winningUsed = deduct(wallet.winningWallet);
    if (remaining > 0)
        throw new apiError_1.ApiError(400, 'Insufficient wallet balance');
    wallet.bonusWallet -= bonusUsed;
    wallet.depositWallet -= depositUsed;
    wallet.winningWallet -= winningUsed;
    await wallet.save();
    contest.spotsLeft -= 1;
    await contest.save();
    const participation = await contestParticipation_model_1.ContestParticipation.create({
        userId,
        contestId,
        amount: entryFee, // ✅ Save amount for leaderboard/statistics
    });
    await (0, transaction_service_1.createTransaction)({
        userId,
        type: 'deduct',
        amount: entryFee,
        message: `Joined contest: ${contest.contestName}`,
    });
    return participation;
};
exports.joinContest = joinContest;
const getAllContestParticipants = () => contestParticipation_model_1.ContestParticipation.find().populate('userId contestId');
exports.getAllContestParticipants = getAllContestParticipants;
const getContestParticipantsByContest = (contestId) => contestParticipation_model_1.ContestParticipation.find({ contestId }).populate('userId');
exports.getContestParticipantsByContest = getContestParticipantsByContest;
const getUserParticipations = (userId) => contestParticipation_model_1.ContestParticipation.find({ userId }).populate('contestId');
exports.getUserParticipations = getUserParticipations;
