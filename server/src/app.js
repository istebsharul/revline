import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middlewares/error.js'; // Ensure correct import path
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);   // Base path for product-related routes
app.use('/api/v1/inventory', inventoryRoutes); // Base path for inventory-related routes

// Use the error handling middleware after all routes and other middleware
app.use(errorHandler);


export default app;
