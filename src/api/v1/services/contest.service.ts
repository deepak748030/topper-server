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
};
