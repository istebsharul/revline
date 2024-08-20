import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/error.js'; // Ensure correct import path

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/v1/auth', authRoutes);

// Use the error handling middleware after all routes and other middleware
app.use(errorHandler);


export default app;
