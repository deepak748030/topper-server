import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ApiError } from '../../../utils/apiError';
import { sendResponse } from '../../../utils/response';
import {
    createUser,
    getAllUsers,
    updateUser,
    findByMobile,
} from '../services/user.service';
import { createWallet } from '../services/wallet.service';
import { IUser } from '../models/user.model';

/**
 * @route   POST /api/v1/users
 * @desc    Create user with optional avatar
 * @access  Public
 */

export const createUserCtrl = asyncHandler(async (req: Request, res: Response) => {
    const payload = { ...req.body };

    if (req.file) {
        payload.avatarImg = `/uploads/${req.file.filename}`;
    }

    const user = await createUser(payload) as IUser; // Now TypeScript knows it's IUser
    const UserId = (user._id as unknown as { toString: () => string }).toString();
    await createWallet(UserId);

    sendResponse(res, true, 'User created', user);
});


/**
 * @route   GET /api/v1/users
 * @desc    Get all users
 * @access  Public
 */
export const getAllUsersCtrl = asyncHandler(async (_req: Request, res: Response) => {
    const users = await getAllUsers();
    sendResponse(res, true, 'Users fetched', users);
});

/**
 * @route   PATCH /api/v1/users/:id
 * @desc    Update user by ID
 * @access  Public
 */
export const updateUserCtrl = asyncHandler(async (req: Request, res: Response) => {
    const payload = { ...req.body };

    if (req.file) {
        payload.avatarImg = `/uploads/${req.file.filename}`;
    }

    const user = await updateUser(req.params.id, payload);
    if (!user) throw new ApiError(404, 'User not found');

    sendResponse(res, true, 'User updated', user);
});

/**
 * @route   POST /api/v1/users/login
 * @desc    Login or create user via mobile number
 * @access  Public
 */
export const loginCtrl = asyncHandler(async (req: Request, res: Response) => {
    const { mobileNo } = req.body;
    if (!mobileNo) throw new ApiError(400, 'mobileNo is required');

    let user = await findByMobile(mobileNo);

    if (!user) {
        user = await createUser({ mobileNo });
        const UserId = (user._id as unknown as { toString: () => string }).toString();
        await createWallet(UserId);
        sendResponse(res, true, 'User created via login', user);
        return;
    }

    sendResponse(res, true, 'User logged in', user);
});
