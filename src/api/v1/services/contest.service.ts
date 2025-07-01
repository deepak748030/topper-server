// src/api/v1/services/contest.service.ts
import { getISTTime, convertMapToObject, getPrizeForRank } from '../../../utils/contest.utils';
import { Wallet } from '../models/wallet.model';
import { Transaction } from '../models/transaction.model';
import { Contest, IContest } from '../models/contest.model';
import { ContestResult } from '../models/contestResult.model';

export const createContest = async (data: Partial<IContest>): Promise<IContest> =>
    Contest.create(data);

export const updateContest = async (id: string, data: Partial<IContest>) =>
    Contest.findByIdAndUpdate(id, data, { new: true });

export const deleteContest = async (id: string) =>
    Contest.findByIdAndDelete(id);

export const getAllContests = async () =>
    Contest.find().sort('-createdAt');
// Get contests where startTime > now (Upcoming Contests)
export const getUpcomingContests = async () => {
    const now = new Date();
    return Contest.find().then(contests =>
        contests.filter(c => new Date(c.startTime) > now).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    );
};

// Get contests currently running (Live Contests)
export const getLiveContests = async () => {
    const now = new Date();
    return Contest.find().then(contests =>
        contests.filter(c => {
            const start = new Date(c.startTime);
            const end = new Date(c.endTime);
            return start <= now && end >= now;
        }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    );
};

// Get contests that are finished (Completed Contests)
export const getCompletedContests = async () => {
    const now = new Date();
    return Contest.find().then(contests =>
        contests.filter(c => new Date(c.endTime) < now).sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime())
    );
}



export const declareResultsForLiveContests = async () => {
    const now = new Date();
    const nowISO = now.toISOString();

    const allContests = await Contest.find({ resultDeclared: false });

    for (const contest of allContests) {
        const start = new Date(contest.startTime);
        const end = new Date(contest.endTime);

        if (start > now) contest.status = 'upcoming';
        else if (start <= now && end >= now) contest.status = 'live';
        else if (end < now) contest.status = 'completed';

        await contest.save();
    }

    const contestsToDeclare = await Contest.find({
        resultDeclared: false,
        endTime: { $gt: nowISO },
    });

    if (!contestsToDeclare.length) return [];

    const updated: any[] = [];

    for (const contest of contestsToDeclare) {
        const prizeMap: Record<string, number> = convertMapToObject(contest.winnerPrizes);

        const results = await ContestResult.find({ contestId: contest._id }).sort([
            ['totalScore', -1],
            ['timeTakenInSeconds', 1],
        ]);

        if (!results.length) continue;

        let rank = 1;

        for (const result of results) {
            try {
                const prizeAmount = getPrizeForRank(rank, prizeMap);

                result.rank = rank;
                result.set('prizeAmount', prizeAmount);
                await result.save();

                if (prizeAmount > 0) {
                    let wallet = await Wallet.findOne({ userId: result.userId });

                    if (!wallet) {
                        wallet = await Wallet.create({
                            userId: result.userId,
                            bonusWallet: 0,
                            depositWallet: 0,
                            winningWallet: prizeAmount,
                        });
                    } else {
                        wallet.winningWallet += prizeAmount;
                        await wallet.save();
                    }

                    await Transaction.create({
                        userId: result.userId,
                        type: 'add',
                        amount: prizeAmount,
                        message: `Prize for rank ${rank} in contest "${contest.contestName}"`,
                    });
                }

                rank++;
            } catch (error) {
                console.log(error);
            }
        }

        contest.status = 'completed';
        contest.resultDeclared = true;
        await contest.save();

        updated.push({
            contestId: contest._id,
            contestName: contest.contestName,
            declaredAtIST: getISTTime(),
        });
    }

    return updated;
};