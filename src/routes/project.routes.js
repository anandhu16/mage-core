import express from 'express';
import cors from 'cors';
import { ProjectController } from '../controllers/project.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const projectController = new ProjectController();

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

// Project routes
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProject);
router.get('/:id/tasks', projectController.getProjectTasks);

export default router; 