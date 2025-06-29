"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/v1/routes/transaction.routes.ts
const express_1 = require("express");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const transaction_controller_1 = require("../controllers/transaction.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Transaction History
 */
/**
 * @swagger
 * /transactions/{userId}:
 *   get:
 *     tags: [Transactions]
 *     summary: Get all transactions of a user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of transactions
 */
router.get('/:userId', (0, asyncHandler_1.asyncHandler)(transaction_controller_1.getTransactionsCtrl));
exports.default = router;
