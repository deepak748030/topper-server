// src/api/v1/services/user.service.ts

import { User, IUser } from '../models/user.model';

export const createUser = async (data: Partial<IUser>): Promise<IUser> =>
    User.create(data);

export const getAllUsers = async (): Promise<IUser[]> =>
    User.find().sort('-createdAt');

export const updateUser = async (id: string, data: Partial<IUser>): Promise<IUser | null> =>
    User.findByIdAndUpdate(id, data, { new: true });

export const findByMobile = async (mobileNo: string): Promise<IUser | null> =>
    User.findOne({ mobileNo });
