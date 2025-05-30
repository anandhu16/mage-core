# Mage Core Setup Guide

This guide will help you set up and run the Mage Core project on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm (comes with Node.js)

## Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd mage-core
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Make sure PostgreSQL is running on your machine
   - Create a new database named `mageDb`
   ```sql
   CREATE DATABASE mageDb;
   ```
   - The default database configuration expects:
     - Host: localhost
     - Port: 5432
     - Database: mageDb
     - Username: postgres
     - Password: postgres123

4. **Environment Configuration**
   - Copy the `.env.example` file to `.env` (if not already present)
   - Update the following environment variables in `.env`:
     ```
     # Server Configuration
     PORT=2080
     NODE_ENV=development

     # Database Configuration
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=mageDb
     DB_USER=postgres
     DB_PASSWORD=postgres123
     DB_URL=postgresql://postgres:postgres123@localhost:5432/mageDb

     # JWT Configuration
     JWT_SECRET=your-secret-key
     JWT_EXPIRES_IN=90d

     API_VERSION=1.0.0
     LOG_LEVEL=info
     CORS_ORIGIN=*
     APP_NAME=mage-core
     ```

## Running the Application

1. **Development Mode**
   ```bash
   npm run dev
   ```
   This will start the server with nodemon for automatic reloading.

2. **Production Mode**
   ```bash
   npm start
   ```

3. **Debug Mode**
   ```bash
   npm run debug
   ```

## Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start the server in development mode with auto-reload
- `npm run debug` - Start the server in debug mode
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically

## Project Structure

```
mage-core/
├── src/           # Source code
├── public/        # Static files
├── tests/         # Test files
├── logs/          # Application logs
├── server.js      # Main application file
├── package.json   # Project dependencies and scripts
└── .env          # Environment variables
```

## Security Considerations

1. **Environment Variables**
   - Never commit the `.env` file to version control
   - Keep your JWT_SECRET secure and unique
   - Use strong passwords for database access

2. **Database Security**
   - Use strong passwords for database users
   - Limit database access to necessary IP addresses
   - Regularly backup your database

## Troubleshooting

1. **Database Connection Issues**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure the database exists

2. **Port Conflicts**
   - If port 2080 is in use, change the PORT in `.env`
   - Check for other services using the same port

3. **Dependencies Issues**
   - Delete `node_modules` and `package-lock.json`
   - Run `npm install` again

## Support

For any issues or questions, please create an issue in the repository or contact the development team. 