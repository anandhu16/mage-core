import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import passport from 'passport';
dotenv.config();

import routes from './routes/index.js';
import { initializeDatabase } from './config/database.js';
import configurePassport from './config/passport.js';
import session from 'express-session';


const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

await initializeDatabase();
app.use(session({
  secret: 'your_secret_key', // Replace with your secret key
  resave: false, saveUninitialized: false, // Don't save sessions until something is stored
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  },
}));


app.use(passport.initialize());
app.use(passport.session());

configurePassport();

app.get('/', (req, res) => {
  res.send('🟢 Server is running.');
});
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    app: process.env.APP_NAME
  });
});

app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  console.error(`[${new Date().toISOString()}] Error: ${err.stack}`);

  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

export default app;

