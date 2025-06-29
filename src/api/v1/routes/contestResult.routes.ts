import { Router } from 'express';
import {
    submitResultCtrl,
    getContestResultsCtrl,
    getUserContestResultCtrl
} from '../controllers/contestResult.controller';
import { asyncHandler } from '../../../utils/asyncHandler';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contest Results
 *   description: Submit and fetch contest results
 */

/**
 * @swagger
 * /contest-result/submit:
 *   post:
 *     summary: Submit contest answers and get score
 *     tags: [Contest Results]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - contestId
 *               - answers
 *               - timeTakenInSeconds
 *             properties:
 *               userId:
 *                 type: string
 *               contestId:
 *                 type: string
 *               timeTakenInSeconds:
 *                 type: number
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     questionId:
 *                       type: string
 *                     selectedAnswer:
 *                       type: string
 *     responses:
 *       200:
 *         description: Result submitted successfully
 */
router.post('/submit', asyncHandler(submitResultCtrl));

/**
 * @swagger
 * /contest-result/contest/{contestId}:
 *   get:
 *     summary: Get leaderboard for a contest
 *     tags: [Contest Results]
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *         description: Contest ID
 *     responses:
 *       200:
 *         description: Contest leaderboard
 */
router.get('/contest/:contestId', asyncHandler(getContestResultsCtrl));

/**
 * @swagger
 * /contest-result/user/{userId}/contest/{contestId}:
 *   get:
 *     summary: Get result for a user in a specific contest
 *     tags: [Contest Results]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched user's result
 */
router.get('/user/:userId/contest/:contestId', asyncHandler(getUserContestResultCtrl));

export default router;
