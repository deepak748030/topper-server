"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCtrl = exports.updateUserCtrl = exports.getAllUsersCtrl = exports.createUserCtrl = void 0;
const asyncHandler_1 = require("../../../utils/asyncHandler");
const apiError_1 = require("../../../utils/apiError");
const response_1 = require("../../../utils/response");
const user_service_1 = require("../services/user.service");
const wallet_service_1 = require("../services/wallet.service");
/**
 * @route   POST /api/v1/users
 * @desc    Create user with optional avatar
 * @access  Public
 */
exports.createUserCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const payload = { ...req.body };
    if (req.file) {
        payload.avatarImg = `/uploads/${req.file.filename}`;
    }
    const user = await (0, user_service_1.createUser)(payload); // Now TypeScript knows it's IUser
    const UserId = user._id.toString();
    await (0, wallet_service_1.createWallet)(UserId);
    (0, response_1.sendResponse)(res, true, 'User created', user);
});
/**
 * @route   GET /api/v1/users
 * @desc    Get all users
 * @access  Public
 */
exports.getAllUsersCtrl = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const users = await (0, user_service_1.getAllUsers)();
    (0, response_1.sendResponse)(res, true, 'Users fetched', users);
});
/**
 * @route   PATCH /api/v1/users/:id
 * @desc    Update user by ID
 * @access  Public
 */
exports.updateUserCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const payload = { ...req.body };
    if (req.file) {
        payload.avatarImg = `/uploads/${req.file.filename}`;
    }
    const user = await (0, user_service_1.updateUser)(req.params.id, payload);
    if (!user)
        throw new apiError_1.ApiError(404, 'User not found');
    (0, response_1.sendResponse)(res, true, 'User updated', user);
});
/**
 * @route   POST /api/v1/users/login
 * @desc    Login or create user via mobile number
 * @access  Public
 */
exports.loginCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { mobileNo } = req.body;
    if (!mobileNo)
        throw new apiError_1.ApiError(400, 'mobileNo is required');
    let user = await (0, user_service_1.findByMobile)(mobileNo);
    if (!user) {
        user = await (0, user_service_1.createUser)({ mobileNo });
        const UserId = user._id.toString();
        await (0, wallet_service_1.createWallet)(UserId);
        (0, response_1.sendResponse)(res, true, 'User created via login', user);
        return;
    }
    (0, response_1.sendResponse)(res, true, 'User logged in', user);
});
