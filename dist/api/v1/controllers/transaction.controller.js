"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionsCtrl = void 0;
const asyncHandler_1 = require("../../../utils/asyncHandler");
const transaction_service_1 = require("../services/transaction.service");
const response_1 = require("../../../utils/response");
exports.getTransactionsCtrl = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const { userId } = req.params;
    const transactions = await (0, transaction_service_1.getTransactionsByUserId)(userId);
    (0, response_1.sendResponse)(res, true, 'Transactions fetched', transactions);
});
