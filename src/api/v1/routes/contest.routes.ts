import { Router } from 'express';
import {
    createContestCtrl,
    updateContestCtrl,
    deleteContestCtrl,
    getAllContestsCtrl,
    getCompletedContestsCtrl,
    getLiveContestsCtrl,
    getUpcomingContestsCtrl,
    declareResultsCtrl,
} from '../controllers/contest.controller';
import { asyncHandler } from '../../../utils/asyncHandler';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Contests
 *   description: Contest management endpoints
 */

/**
 * @swagger
 * /contests:
 *   post:
 *     tags: [Contests]
 *     summary: Create a new contest
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contestName:
 *                 type: string
 *               entryFees:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [public, private, multiplayer]
 *               startTime:
 *                 type: string
 *                 format: date-time
 *               endTime:
 *                 type: string
 *                 format: date-time
 *               date:
 *                 type: string
 *               totalQuestions:
 *                 type: number
 *               prizePool:
 *                 type: number
 *               totalSpots:
 *                 type: number
 *               winnerPrizes:
 *                 type: object
 *                 additionalProperties:
 *                   type: number
 *               creatorName:
 *                 type: string
 *                 description: Optional name of the contest creator
 *     responses:
 *       200:
 *         description: Contest created
 */
router.post('/', asyncHandler(createContestCtrl));

/**
 * @swagger
 * /contests:
 *   get:
 *     tags: [Contests]
 *     summary: Get all contests
 *     responses:
 *       200:
 *         description: List of all contests
 */
router.get('/', asyncHandler(getAllContestsCtrl));

/**
 * @swagger
 * /contests/{id}:
 *   patch:
 *     tags: [Contests]
 *     summary: Update a contest
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update
 *     responses:
 *       200:
 *         description: Contest updated
 */
router.patch('/:id', asyncHandler(updateContestCtrl));

/**
 * @swagger
 * /contests/{id}:
 *   delete:
 *     tags: [Contests]
 *     summary: Delete a contest
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contest deleted
 */
router.delete('/:id', asyncHandler(deleteContestCtrl));

// ✅ Get upcoming contests
/**
 * @swagger
 * /contests/upcoming:
 *   get:
 *     tags: [Contests]
 *     summary: Get all upcoming contests
 *     responses:
 *       200:
 *         description: Upcoming contests list
 */
router.get('/upcoming', asyncHandler(getUpcomingContestsCtrl));

// ✅ Get live contests
/**
 * @swagger
 * /contests/live:
 *   get:
 *     tags: [Contests]
 *     summary: Get all live contests
 *     responses:
 *       200:
 *         description: Live contests list
 */
router.get('/live', asyncHandler(getLiveContestsCtrl));

// ✅ Get completed contests
/**
 * @swagger
 * /contests/completed:
 *   get:
 *     tags: [Contests]
 *     summary: Get all completed contests
 *     responses:
 *       200:
 *         description: Completed contests list
 */
router.get('/completed', asyncHandler(getCompletedContestsCtrl));

/**
 * @swagger
 * /contests/declare-results:
 *   post:
 *     tags: [Contests]
 *     summary: Declare results for contests that ended
 *     responses:
 *       200:
 *         description: Results declared for eligible contests
 */

router.post('/declare-results', asyncHandler(declareResultsCtrl));

export default router;
