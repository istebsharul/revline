import mongoose from 'mongoose';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config()

const DB_URI = process.env.DB_URI;

const connectDatabase = async() => {
  try {
    if(!DB_URI){
        throw new Error('DB_URI environment variable is not defined');
    }
    const connectInstance = await mongoose.connect(
        `${DB_URI}`
    );
    logger.info(
        `Successfully Connected to Database. Host: ${connectInstance.connection.host}`
    );
  } catch (error) {
    
  }
};

export default connectDatabase;