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

    const connectInstance = await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 50000, // Increase timeout if needed
    });

    logger.info(`Successfully connected to Database. Host: ${connectInstance.connection.host}`);
  } catch (error) {
    logger.error(`Database connection error: ${error.message}`);
    process.exit(1); // Exit the process with failure code
  }
};

export default connectDatabase;
