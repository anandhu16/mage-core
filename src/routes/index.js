import express from 'express';
import userRoutes from './user.routes.js';
import projectRoutes from './project.routes.js';
import taskRoutes from './task.routes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: `PM Core API ${process.env.API_VERSION} is running`,
    timestamp: new Date().toISOString(),
    documentation: '/api/docs',
  });
});

router.get('/version', (req, res) => {
  res.status(200).json({
    status: 'success',
    version: process.env.API_VERSION,
    timestamp: new Date().toISOString(),
  });
});

// Mount routes
router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/tasks', taskRoutes);

export default router;
