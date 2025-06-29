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
