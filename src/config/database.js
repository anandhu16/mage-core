import { Sequelize } from 'sequelize';


const dbConfig = {
    development: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres123',
        database: process.env.DB_NAME || 'mageDb',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: console.log,
    },
    test: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres123',
        database: process.env.DB_NAME || 'mageDb',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        logging: false,
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
};

console.log(dbConfig[process.env.NODE_ENV]);
const config = dbConfig[process.env.NODE_ENV] || dbConfig.development;

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        port: config.port,
        dialect: config.dialect,
        logging: config.logging,
        pool: config.pool,
    }
);

// Export sequelize instance
export default sequelize;

// Export initialization function
export const initializeDatabase = async () => {
    try {

        const { default: User } = await import('../models/user.model.js');
        const { default: Project } = await import('../models/project.model.js');
        const { default: Task } = await import('../models/task.model.js');

        // Initialize models
        const models = {
            User,
            Project,
            Task
        };

        // Initialize each model
        for (const model of Object.values(models)) {
            model.init(sequelize);
        }

        // Test the database connection
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');

        // Sync all models with the database
        // await sequelize.sync({ force: true });
        console.log('All models were synchronized successfully.');

        return models;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
}; 