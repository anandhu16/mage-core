import { UserService } from '../services/user.service.js';

export class UserController {

    constructor() {
        this.userService = new UserService();
    }

    getUserById = async (req, res) => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            res.status(200).json({
                status: 'success',
                data: user
            });
        } catch (error) {
            res.status(error.message === 'User not found' ? 404 : 500).json({
                status: 'error',
                message: error.message
            });
        }
    }

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await this.userService.login(email, password);
            res.status(200).json({
                status: 'success',
                data: result
            });
        } catch (error) {
            res.status(401).json({
                status: 'error',
                message: error.message
            });
        }
    }

    register = async (req, res) => {
        try {
            const result = await this.userService.register(req.body);
            res.status(200).json({
                status: 'success',
                data: result
            });
        } catch (error) {
            res.status(error.message === 'User already exists' ? 409 : 500).json({
                status: 'error',
                message: error.message
            });
        }
    }
}

