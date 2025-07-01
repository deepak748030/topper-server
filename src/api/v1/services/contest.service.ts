// src/api/v1/services/contest.service.ts
import { Contest, IContest } from '../models/contest.model';

export const createContest = async (data: Partial<IContest>): Promise<IContest> =>
    Contest.create(data);

export const updateContest = async (id: string, data: Partial<IContest>) =>
    Contest.findByIdAndUpdate(id, data, { new: true });

export const deleteContest = async (id: string) =>
    Contest.findByIdAndDelete(id);

export const getAllContests = async () =>
    Contest.find().sort('-createdAt');

// Get contests where startTime > now
export const getUpcomingContests = async () => {
    const now = new Date().toISOString();
    return Contest.find({ startTime: { $gt: now } }).sort('startTime');
};

// Get contests currently running
export const getLiveContests = async () => {
    const now = new Date().toISOString();
    return Contest.find({
        startTime: { $lte: now },
        endTime: { $gte: now },
    }).sort('startTime');
};

// Get contests that are finished
export const getCompletedContests = async () => {
    const now = new Date().toISOString();
    return Contest.find({ endTime: { $lt: now } }).sort('-endTime');
};
