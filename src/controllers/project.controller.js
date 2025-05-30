import { ProjectService } from '../services/project.service.js';

export class ProjectController {
    constructor() {
        this.projectService = new ProjectService();
    }

    getAllProjects = async (req, res) => {
        try {
            const projects = await this.projectService.getAllProjects();
            res.status(200).json({
                status: 'success',
                data: projects
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    getProjectById = async (req, res) => {
        try {
            const project = await this.projectService.getProjectById(req.params.id);
            res.status(200).json({
                status: 'success',
                data: project
            });
        } catch (error) {
            res.status(error.message === 'Project not found' ? 404 : 500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    createProject = async (req, res) => {
        try {
            const project = await this.projectService.createProject(req.body);
            res.status(201).json({
                status: 'success',
                data: project
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    getProjectTasks = async (req, res) => {
        try {
            const tasks = await this.projectService.getProjectTasks(req.params.id);
            res.status(200).json({
                status: 'success',
                data: tasks
            });
        } catch (error) {
            res.status(error.message === 'Project not found' ? 404 : 500).json({
                status: 'error',
                message: error.message
            });
        }
    }
} 