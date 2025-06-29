import { Router } from 'express';
import {
    joinContestCtrl,
    getAllParticipantsCtrl,
    getParticipantsByContestCtrl,
    getUserParticipationsCtrl,
} from '../controllers/contestParticipation.controller';
import { asyncHandler } from '../../../utils/asyncHandler';

const router = Router();

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
router.post('/join', asyncHandler(joinContestCtrl));

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
router.get('/', asyncHandler(getAllParticipantsCtrl));

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
router.get('/contest/:contestId', asyncHandler(getParticipantsByContestCtrl));

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
router.get('/user/:userId', asyncHandler(getUserParticipationsCtrl));

export default router;
