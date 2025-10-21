import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { AppDataSource } from './database/connection';
import userRoutes from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database connection
const startServer = async () => {
  try {
    await AppDataSource.initialize();
    console.log('📊 Database connected successfully');

    // Middleware
    app.use(helmet());
    app.use(cors());
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true }));
    app.use(requestLogger);

    // Routes
    app.use('/api/users', userRoutes);

    // Health check endpoint
    app.get('/api/health', (req, res) => {
      res.status(200).json({
        status: 'OK',
        message: 'Express TypeScript CRUD API is running',
        timestamp: new Date().toISOString(),
        database: AppDataSource.isInitialized ? 'Connected' : 'Disconnected'
      });
    });

    // 404 handler
    app.use('*', (req, res) => {
      res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    });

    // Error handling middleware
    app.use(errorHandler);

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📍 API endpoints available at http://localhost:${PORT}/api`);
      console.log(`🏥 Health check: http://localhost:${PORT}/api/health`);
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();

export default app;