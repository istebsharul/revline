import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const DB_URI = process.env.DB_URI;

const connectDatabase = async () => {
  try {
    if (!DB_URI) {
      throw new Error('DB_URI environment variable is not defined');
    }

    if (mongoose.connection.readyState === 1) {
      return; // Already connected, avoid redundant connections
    }

    const connectInstance = await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout
    });

    logger.info(
      `✅ Successfully Connected to Database. Host: ${connectInstance.connection.host}`
    );
  } catch (error) {
    logger.error(`🚨 Database Connection Error: ${error.message}`);
    process.exit(1); // Stop worker if DB connection fails
  }
};

export default connectDatabase;