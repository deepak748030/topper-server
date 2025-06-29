"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const asyncHandler_1 = require("../../../utils/asyncHandler");
const multer_1 = require("../../../config/multer");
const router = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */
/**
 * @swagger
 * /users:
 *   post:
 *     tags: [Users]
 *     summary: Create a user
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNo:
 *                 type: string
 *               name:
 *                 type: string
 *               avatarImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User created
 */
router.post('/', multer_1.upload.single('avatarImg'), (0, asyncHandler_1.asyncHandler)(user_controller_1.createUserCtrl));
/**
 * @swagger
 * /users:
 *   get:
 *     tags: [Users]
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', (0, asyncHandler_1.asyncHandler)(user_controller_1.getAllUsersCtrl));
/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     tags: [Users]
 *     summary: Update a user
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               avatarImg:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated
 */
router.patch('/:id', multer_1.upload.single('avatarImg'), (0, asyncHandler_1.asyncHandler)(user_controller_1.updateUserCtrl));
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [Users]
 *     summary: Login or create user by mobileNo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mobileNo
 *             properties:
 *               mobileNo:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in or created
 */
router.post('/login', (0, asyncHandler_1.asyncHandler)(user_controller_1.loginCtrl));
exports.default = router;
