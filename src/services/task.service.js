import Project from '../models/project.model.js';
import Task from '../models/task.model.js';
import Logger from '../utils/logger.js';
import User from '../models/user.model.js';

export class TaskService {
    constructor() {
        this.taskData = [];
    }

    createTask = async (taskData) => {
        try {
            // Check if createdBy exists in the related table
            const userExists = await User.findByPk(taskData.createdBy);
            if (!userExists) {
                Logger.error(`User not found with id: ${taskData.createdBy}`);
                throw new Error('User not found');
            }

            Logger.info(`Creating task with data: ${JSON.stringify(taskData)}`);
            const task = await Task.create(taskData);

            const project = await Project.findByPk(taskData.projectId);
            if (!project) {
                Logger.error(`Project not found with id: ${taskData.projectId}`);
                throw new Error('Project not found');
            }

            await project.update({ taskIds: [...project.taskIds, task.id] });
            console.log(` project: ${JSON.stringify(project)}`);
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