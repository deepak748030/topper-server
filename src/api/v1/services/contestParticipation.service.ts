// src/api/v1/services/contestParticipation.service.ts
import { ContestParticipation } from '../models/contestParticipation.model';
import { Contest } from '../models/contest.model';
import { Wallet } from '../models/wallet.model';
import { ApiError } from '../../../utils/apiError';

export const joinContest = async (userId: string, contestId: string) => {
    // Check if user already joined
    const alreadyJoined = await ContestParticipation.findOne({ userId, contestId });
    if (alreadyJoined) {
        throw new ApiError(400, 'User already joined this contest');
    }

    const contest = await Contest.findById(contestId);
    if (!contest) throw new ApiError(404, 'Contest not found');

    if (contest.spotsLeft <= 0) {
        throw new ApiError(400, 'No spots left in the contest');
    }

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) throw new ApiError(404, 'User wallet not found');

    const entryFee = contest.entryFees;
    let remaining = entryFee;

    const deduct = (walletPart: number) => {
        if (walletPart >= remaining) {
            const used = remaining;
            remaining = 0;
            return used;
        } else {
            const used = walletPart;
            remaining -= walletPart;
            return used;
        }
    };

    const bonusUsed = deduct(wallet.bonusWallet);
    const depositUsed = deduct(wallet.depositWallet);
    const winningUsed = deduct(wallet.winningWallet);

    if (remaining > 0) {
        throw new ApiError(400, 'Insufficient wallet balance');
    }

    wallet.bonusWallet -= bonusUsed;
    wallet.depositWallet -= depositUsed;
    wallet.winningWallet -= winningUsed;

    await wallet.save();

    contest.spotsLeft -= 1;
    await contest.save();

    const participation = await ContestParticipation.create({
        userId,
        contestId,
    });

    return participation;
};

export const getAllContestParticipants = () =>
    ContestParticipation.find().populate('userId contestId');

export const getContestParticipantsByContest = (contestId: string) =>
    ContestParticipation.find({ contestId }).populate('userId');

export const getUserParticipations = async (userId: string) => {
    return ContestParticipation.find({ userId }).populate('contestId');
};
