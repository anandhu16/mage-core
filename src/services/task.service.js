import Project from '../models/project.model.js';
import Task from '../models/task.model.js';
import Logger from '../utils/logger.js';

export class TaskService {
    constructor() {
        this.taskData = [];
    }

    createTask = async (taskData) => {
        try {
            Logger.info(`Creating task with data: ${JSON.stringify(taskData)}`);
            const task = await Task.create(taskData);

            const project = await Project.findByPk(taskData.projectId);
            project.taskIds.push(task.id);
            await project.save();
            Logger.info(`Task created: ${JSON.stringify(task)}`);
            return task;
        } catch (error) {
            Logger.error(`Error creating task: ${error.message}`);
            throw error;
        }
    }

    updateTask = async (taskId, taskData) => {
        try {
            Logger.info(`Updating task ${taskId} with data: ${JSON.stringify(taskData)}`);
            const task = await Task.findByPk(taskId);
            if (!task) {
                Logger.error(`Task not found with id: ${taskId}`);
                throw new Error('Task not found');
            }
            await task.update(taskData);
            Logger.info(`Task updated: ${JSON.stringify(task)}`);
            return task;
        } catch (error) {
            Logger.error(`Error updating task: ${error.message}`);
            throw error;
        }
    }

    getTaskById = async (taskId) => {
        try {
            Logger.info(`Fetching task with id: ${taskId}`);
            const task = await Task.findByPk(taskId);
            if (!task) {
                Logger.error(`Task not found with id: ${taskId}`);
                throw new Error('Task not found');
            }
            return task;
        } catch (error) {
            Logger.error(`Error fetching task by id: ${error.message}`);
            throw error;
        }
    }
} 