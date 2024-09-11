import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userAuthRoutes.js';
import adminRoutes from './routes/adminAuthRoutes.js';
import errorHandler from './middlewares/error.js'; // Ensure correct import path
import cookieParser from 'cookie-parser';
import productRoutes from './routes/productRoutes.js';
import inventoryRoutes from './routes/inventoryRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import ivrRoutes from './routes/ivrRoutes.js';
import quotationRoutes from './routes/quotationRoutes.js';
import paypalController from './controllers/paypalController.js';
const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/admin-auth',adminRoutes);
app.use('/api/v1/products', productRoutes);   // Base path for product-related routes
app.use('/api/v1/inventory', inventoryRoutes); // Base path for inventory-related routes
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/ivr',ivrRoutes);
app.use('/api/v1/quotation', quotationRoutes);
app.use('/api/V1/paypal', paypalController);

// Use the error handling middleware after all routes and other middleware
app.use(errorHandler);


export default app;
