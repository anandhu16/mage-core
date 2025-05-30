import { TaskService } from '../services/task.service.js';

export class TaskController {
    constructor() {
        this.taskService = new TaskService();
    }

    createTask = async (req, res) => {
        try {
            const taskData = {
                ...req.body,
                createdBy: req.user.userId,
                updatedBy: req.user.userId
            };
            const task = await this.taskService.createTask(taskData);
            res.status(201).json({
                status: 'success',
                data: task
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    updateTask = async (req, res) => {
        try {
            const taskData = {
                ...req.body,
                updatedBy: req.user.userId
            };
            const task = await this.taskService.updateTask(req.params.id, taskData);
            res.status(200).json({
                status: 'success',
                data: task
            });
        } catch (error) {
            res.status(error.message === 'Task not found' ? 404 : 500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    getTaskById = async (req, res) => {
        try {
            const task = await this.taskService.getTaskById(req.params.id);
            res.status(200).json({
                status: 'success',
                data: task
            });
        } catch (error) {
            res.status(error.message === 'Task not found' ? 404 : 500).json({
                status: 'error',
                message: error.message
            });
        }
    }
} 