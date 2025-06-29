// src/api/v1/controllers/wallet.controller.ts
import { Request, Response } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { ApiError } from '../../../utils/apiError';
import { sendResponse } from '../../../utils/response';
import {
    getAllWallets,
    getWalletByUserId,
    updateWallet,
} from '../services/wallet.service';

export const getAllWalletsCtrl = asyncHandler(async (_req, res) => {
    const wallets = await getAllWallets();
    sendResponse(res, true, 'Wallets fetched', wallets);
});

export const getWalletByUserIdCtrl = asyncHandler(async (req, res) => {
    const wallet = await getWalletByUserId(req.params.userId);
    if (!wallet) throw new ApiError(404, 'Wallet not found');
    sendResponse(res, true, 'Wallet fetched', wallet);
});

export const updateWalletCtrl = asyncHandler(async (req, res) => {
    const wallet = await updateWallet(req.params.userId, req.body);
    if (!wallet) throw new ApiError(404, 'Wallet not found');
    sendResponse(res, true, 'Wallet updated', wallet);
});
