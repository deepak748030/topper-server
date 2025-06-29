"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contestParticipation_controller_1 = require("../controllers/contestParticipation.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: ContestParticipation
 *   description: APIs for contest joining and participation
 */
/**
 * @swagger
 * /contest-participation/join:
 *   post:
 *     tags: [ContestParticipation]
 *     summary: Join a contest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - contestId
 *             properties:
 *               userId:
 *                 type: string
 *               contestId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully joined the contest
 */
router.post('/join', (0, asyncHandler_1.asyncHandler)(contestParticipation_controller_1.joinContestCtrl));
/**
 * @swagger
 * /contest-participation:
 *   get:
 *     tags: [ContestParticipation]
 *     summary: Get all contest participations
 *     responses:
 *       200:
 *         description: List of all participations
 */
router.get('/', (0, asyncHandler_1.asyncHandler)(contestParticipation_controller_1.getAllParticipantsCtrl));
/**
 * @swagger
 * /contest-participation/contest/{contestId}:
 *   get:
 *     tags: [ContestParticipation]
 *     summary: Get participants of a specific contest
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Participants list
 */
router.get('/contest/:contestId', (0, asyncHandler_1.asyncHandler)(contestParticipation_controller_1.getParticipantsByContestCtrl));
/**
 * @swagger
 * /contest-participation/user/{userId}:
 *   get:
 *     tags: [ContestParticipation]
 *     summary: Get all contests joined by a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of joined contests
 */
router.get('/user/:userId', (0, asyncHandler_1.asyncHandler)(contestParticipation_controller_1.getUserParticipationsCtrl));
exports.default = router;
