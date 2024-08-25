import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js'
import inventoryRoutes from './routes/inventoryRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import warrentyRoutes from './routes/warrantyRoutes.js'
import returnPolicyRoutes from './routes/returnPolicyRoutes.js'
import SalesManagementRoutes from './routes/salesManagementRoutes.js'
import communicationLogsRoutes from './routes/communicationLogsRoutes.js'
import marketingAdsRoutes from './routes/marketingAdsRoutes.js'
import errorHandler from './middlewares/error.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', productRoutes);
app.use('/api/v1', inventoryRoutes);
app.use('/api/v1', orderRoutes);
app.use('/api/v1', warrentyRoutes);
app.use('/api/v1', returnPolicyRoutes);
app.use('/api/v1', SalesManagementRoutes);
app.use('/api/v1', communicationLogsRoutes);
app.use('/api/v1', marketingAdsRoutes);

// Use the error handling middleware after all routes and other middleware
app.use(errorHandler);


export default app;
