import { Router } from 'express';
import {
    createUserCtrl,
    getAllUsersCtrl,
    updateUserCtrl,
    loginCtrl,
} from '../controllers/user.controller';
import { asyncHandler } from '../../../utils/asyncHandler';
import { upload } from '../../../config/multer';

const router = Router();

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
router.post('/', upload.single('avatarImg'), asyncHandler(createUserCtrl));

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
router.get('/', asyncHandler(getAllUsersCtrl));

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
router.patch('/:id', upload.single('avatarImg'), asyncHandler(updateUserCtrl));

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
router.post('/login', asyncHandler(loginCtrl));

export default router;
