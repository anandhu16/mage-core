import express from 'express';
import cors from 'cors';
import {
    UserController
} from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const userController = new UserController();

// CORS options
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
router.use(cors(corsOptions));

// Public routes
router.post('/login', userController.login);
router.post('/register', userController.register);

// Protected routes
router.use(authenticateToken);
router.get('/:id', userController.getUserById);

export default router; 