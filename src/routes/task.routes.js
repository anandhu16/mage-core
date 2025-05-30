import express from 'express';
import cors from 'cors';
import { TaskController } from '../controllers/task.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const taskController = new TaskController();

// CORS options
const corsOptions = {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
router.use(cors(corsOptions));

// Apply authentication middleware to all routes
router.use(authenticateToken);

// Task routes
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.get('/:id', taskController.getTaskById);

export default router; 