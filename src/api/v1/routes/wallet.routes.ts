// src/api/v1/routes/wallet.routes.ts
import { Router } from 'express';
import {
    getAllWalletsCtrl,
    getWalletByUserIdCtrl,
    updateWalletCtrl,
} from '../controllers/wallet.controller';
import { asyncHandler } from '../../../utils/asyncHandler';

const router = Router();

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
router.get('/', asyncHandler(getAllWalletsCtrl));

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
router.get('/:userId', asyncHandler(getWalletByUserIdCtrl));

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
router.patch('/:userId', asyncHandler(updateWalletCtrl));

export default router;
