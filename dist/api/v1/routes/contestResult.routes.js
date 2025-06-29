"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contestResult_controller_1 = require("../controllers/contestResult.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const router = (0, express_1.Router)();
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
router.post('/submit', (0, asyncHandler_1.asyncHandler)(contestResult_controller_1.submitResultCtrl));
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
router.get('/contest/:contestId', (0, asyncHandler_1.asyncHandler)(contestResult_controller_1.getContestResultsCtrl));
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
router.get('/user/:userId/contest/:contestId', (0, asyncHandler_1.asyncHandler)(contestResult_controller_1.getUserContestResultCtrl));
exports.default = router;
