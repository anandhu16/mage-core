import Project from '../models/project.model.js';
import Task from '../models/task.model.js';
import Logger from '../utils/logger.js';

export class ProjectService {
    constructor() {
        this.projectData = [];
    }

    getAllProjects = async () => {
        try {
            Logger.info('Fetching all projects');
            const projects = await Project.findAll();
            return projects;
        } catch (error) {
            Logger.error(`Error fetching all projects: ${error.message}`);
            throw error;
        }
    }

    getProjectById = async (projectId) => {
        try {
            Logger.info(`Fetching project with id: ${projectId}`);
            const project = await Project.findByPk(projectId);
            if (!project) {
                Logger.error(`Project not found with id: ${projectId}`);
                throw new Error('Project not found');
            }
            return project;
        } catch (error) {
            Logger.error(`Error fetching project by id: ${error.message}`);
            throw error;
        }
    }

    createProject = async (projectData) => {
        try {
            Logger.info(`Creating project with data: ${JSON.stringify(projectData)}`);
            const project = await Project.create(projectData);
            Logger.info(`Project created: ${JSON.stringify(project)}`);
            return project;
        } catch (error) {
            Logger.error(`Error creating project: ${error.message}`);
            throw error;
        }
    }

    getProjectTasks = async (projectId) => {
        try {
            Logger.info(`Fetching tasks for project: ${projectId}`);
            const project = await Project.findByPk(projectId);
            if (!project) {
                Logger.error(`Project not found with id: ${projectId}`);
                throw new Error('Project not found');
            }
            Logger.info(`Project tasks: ${JSON.stringify(project.taskIds)}`);
            let allTasks = [];
            for (const taskId of project.taskIds) {
                Logger.info(`Task: ${JSON.stringify(taskId)}`);
                const taskData = await Task.findByPk(taskId);
                allTasks.push(taskData);
            }
            console.log(allTasks);
            return allTasks;
        } catch (error) {
            Logger.error(`Error fetching project tasks: ${error.message}`);
            throw error;
        }
    }
} 