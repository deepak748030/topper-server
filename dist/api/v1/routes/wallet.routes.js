"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/v1/routes/wallet.routes.ts
const express_1 = require("express");
const wallet_controller_1 = require("../controllers/wallet.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Wallets
 *   description: Wallet management
 */
/**
 * @swagger
 * /wallets:
 *   get:
 *     tags: [Wallets]
 *     summary: Get all wallets
 *     responses:
 *       200:
 *         description: Wallet list
 */
router.get('/', (0, asyncHandler_1.asyncHandler)(wallet_controller_1.getAllWalletsCtrl));
/**
 * @swagger
 * /wallets/{userId}:
 *   get:
 *     tags: [Wallets]
 *     summary: Get wallet by user ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Wallet details
 */
router.get('/:userId', (0, asyncHandler_1.asyncHandler)(wallet_controller_1.getWalletByUserIdCtrl));
/**
 * @swagger
 * /wallets/{userId}:
 *   patch:
 *     tags: [Wallets]
 *     summary: Update wallet fields
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bonusWallet:
 *                 type: number
 *               depositWallet:
 *                 type: number
 *               winningWallet:
 *                 type: number
 *     responses:
 *       200:
 *         description: Wallet updated
 */
router.patch('/:userId', (0, asyncHandler_1.asyncHandler)(wallet_controller_1.updateWalletCtrl));
exports.default = router;
