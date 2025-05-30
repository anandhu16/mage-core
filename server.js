import app from './src/app.js';
import cors from 'cors';

process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;

app.use(cors());

const server = app.listen(PORT, () => {
  console.log(`
    ################################################
    🚀  Server listening on port: ${PORT}
    🌐  Environment: ${process.env.NODE_ENV || 'development'}
    📅  ${new Date().toISOString()}
    ################################################
  `);
});

process.on('unhandledRejection', (err) => {
  console.error('💥 UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);


  server.close(() => {
    process.exit(1);
  });
});


process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received. Gracefully shutting down...');
  server.close(() => {
    console.log('💤 Process terminated!');
  });
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received. Gracefully shutting down...');
  server.close(() => {
    console.log('💤 Process terminated!');
    process.exit(0);
  });
});

