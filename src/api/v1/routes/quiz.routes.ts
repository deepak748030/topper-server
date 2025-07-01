// src/api/v1/routes/quiz.routes.ts
import { Router } from 'express';
import { asyncHandler } from '../../../utils/asyncHandler';
import { upload } from '../../../config/multer';
import {
    createQuizCtrl,
    getQuizByContestIdCtrl,
    updateQuizCtrl,
    deleteQuizCtrl,
    getAllQuizzes
} from '../controllers/quiz.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Quizzes
 *   description: Quiz management
 */

/**
 * @swagger
 * /quizzes:
 *   post:
 *     tags: [Quizzes]
 *     summary: Create a new quiz question
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               option1:
 *                 type: string
 *               option2:
 *                 type: string
 *               option3:
 *                 type: string
 *               option4:
 *                 type: string
 *               correctAnswer:
 *                 type: string
 *               contestId:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Quiz created successfully
 */
router.post('/', upload.single('image'), asyncHandler(createQuizCtrl));

/**
 * @swagger
 * /quizzes/contest/{contestId}:
 *   get:
 *     tags: [Quizzes]
 *     summary: Get quizzes by contest ID
 *     parameters:
 *       - in: path
 *         name: contestId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quizzes fetched
 */
router.get('/contest/:contestId', asyncHandler(getQuizByContestIdCtrl));

/**
 * @swagger
 * /quizzes/{id}:
 *   patch:
 *     tags: [Quizzes]
 *     summary: Update quiz
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               question:
 *                 type: string
 *               option1:
 *                 type: string
 *               option2:
 *                 type: string
 *               option3:
 *                 type: string
 *               option4:
 *                 type: string
 *               correctAnswer:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Quiz updated
 */
router.patch('/:id', upload.single('image'), asyncHandler(updateQuizCtrl));

/**
 * @swagger
 * /quizzes/{id}:
 *   delete:
 *     tags: [Quizzes]
 *     summary: Delete quiz
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Quiz deleted
 */
router.delete('/:id', asyncHandler(deleteQuizCtrl));

/**
 * @swagger
 * /quizzes:
 *   get:
 *     tags: [Quizzes]
 *     summary: Get all quizzes
 *     responses:
 *       200:
 *         description: List of all quizzes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       question:
 *                         type: string
 *                       options:
 *                         type: array
 *                         items:
 *                           type: string
 *                       correctAnswer:
 *                         type: string
 *                       contestId:
 *                         type: string
 *                       image:
 *                         type: string
 */
router.get('/', getAllQuizzes);


export default router;
