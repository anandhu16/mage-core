import Logger from '../utils/logger.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
export class UserService {
    constructor() {
        this.userData = [];
        this.defaultRole = 'member';
    }

    createUser = async (userData) => {
        try {
            Logger.info(`Creating user with data: ${JSON.stringify(userData)}`);
            const user = await User.create(userData);
            Logger.info(`User created: ${JSON.stringify(user)}`);
            return user;
        } catch (error) {
            Logger.error(`Error creating user: ${error.message}`);
            throw error;
        }
    }

    getUserById = async (userId) => {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                Logger.error(`User not found with id: ${userId}`);
                throw new Error('User not found');
            }
            return user;
        } catch (error) {
            Logger.error(`Error getting user by id: ${error.message}`);
            throw error;
        }
    }

    login = async (email, password) => {
        try {
            Logger.info(`Attempting login for email: ${email}`);
            const user = await User.findOne({ where: { email } });

            if (!user) {
                Logger.error(`User not found with email: ${email}`);
                throw new Error('Invalid credentials');
            }

            const isValidPassword = await user.isPasswordValid(password);
            if (!isValidPassword) {
                Logger.error(`Invalid password for email: ${email}`);
                throw new Error('Invalid credentials');
            }

            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return { user, token };
        } catch (error) {
            Logger.error(`Login error: ${error.message}`);
            throw error;
        }
    }

    register = async (userData) => {
        try {
            Logger.info(`Attempting registration for email: ${userData.email}`);

            const existingUser = await User.findOne({ where: { email: userData.email } });

            if (existingUser) {
                Logger.error(`User already exists with email: ${userData.email}`);
                throw new Error('User already exists');
            }

            const user = await this.createUser(userData);
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            return { user, token };
        } catch (error) {
            Logger.error(`Registration error: ${error.message} ${error.stack}`);
            throw error;
        }
    }
}
