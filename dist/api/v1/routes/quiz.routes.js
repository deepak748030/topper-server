"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/v1/routes/quiz.routes.ts
const express_1 = require("express");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const multer_1 = require("../../../config/multer");
const quiz_controller_1 = require("../controllers/quiz.controller");
const router = (0, express_1.Router)();
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
router.post('/', multer_1.upload.single('image'), (0, asyncHandler_1.asyncHandler)(quiz_controller_1.createQuizCtrl));
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
router.get('/contest/:contestId', (0, asyncHandler_1.asyncHandler)(quiz_controller_1.getQuizByContestIdCtrl));
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
router.patch('/:id', multer_1.upload.single('image'), (0, asyncHandler_1.asyncHandler)(quiz_controller_1.updateQuizCtrl));
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
router.delete('/:id', (0, asyncHandler_1.asyncHandler)(quiz_controller_1.deleteQuizCtrl));
exports.default = router;
