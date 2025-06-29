"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWalletCtrl = exports.getWalletByUserIdCtrl = exports.getAllWalletsCtrl = void 0;
const asyncHandler_1 = require("../../../utils/asyncHandler");
const apiError_1 = require("../../../utils/apiError");
const response_1 = require("../../../utils/response");
const wallet_service_1 = require("../services/wallet.service");
exports.getAllWalletsCtrl = (0, asyncHandler_1.asyncHandler)(async (_req, res) => {
    const wallets = await (0, wallet_service_1.getAllWallets)();
    (0, response_1.sendResponse)(res, true, 'Wallets fetched', wallets);
});
exports.getWalletByUserIdCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const wallet = await (0, wallet_service_1.getWalletByUserId)(req.params.userId);
    if (!wallet)
        throw new apiError_1.ApiError(404, 'Wallet not found');
    (0, response_1.sendResponse)(res, true, 'Wallet fetched', wallet);
});
exports.updateWalletCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const wallet = await (0, wallet_service_1.updateWallet)(req.params.userId, req.body);
    if (!wallet)
        throw new apiError_1.ApiError(404, 'Wallet not found');
    (0, response_1.sendResponse)(res, true, 'Wallet updated', wallet);
});
