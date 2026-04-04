import express from 'express';
import * as UserController from '../controllers/userController.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in to get your JWT Token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful (Returns User Data + Token)
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new standard user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Username or Email already exists
 */
router.post('/register', UserController.register);

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get your own user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Your profile data
 *       401:
 *         description: Unauthorized - Missing or Invalid Token
 */
router.get('/profile', verifyToken, UserController.getProfile);

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: View all registered users in the system (Admin Only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all users and their roles
 *       401:
 *         description: Unauthorized - Missing Token
 *       403:
 *         description: Forbidden - You do not have Admin privileges
 */
router.get('/all', verifyToken, isAdmin, UserController.getAllUsers);

export default router;