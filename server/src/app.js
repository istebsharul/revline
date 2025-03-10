import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userAuthRoutes.js';
import adminRoutes from './routes/adminAuthRoutes.js';
import errorHandler from './middlewares/error.js'; // Ensure correct import path
import cookieParser from 'cookie-parser';
import inventoryRoutes from './routes/inventoryRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import paypalRoutes from './routes/paymentRoutes.js';
import customerSupportRoutes from './routes/customerSupportRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import formRoutes from './routes/formRoutes.js';
import rateLimit from 'express-rate-limit';

const app = express();

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: true,
    message:{
        status: 'error',
        message: 'Too many requests, please try again later.',
    }
});
app.use(limiter);

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['https://revlineautoparts.com', 'https://admin.revlineautoparts.com'], // Only allow your frontend domain
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],   // Allowed methods
    credentials: true,                          // Allow cookies/auth headers
}));

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is up and running!',
        timestamp: new Date(),
    });
});

import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import { ExpressAdapter } from '@bull-board/express';
import { Queue } from "bullmq";
import redis from "./config/redisConfig.js"; // Ensure correct Redis config path

// Create Express adapter for Bull Board
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues'); 

// Define the queue
const followUpEmailQueue = new Queue("followUpEmailQueue", { connection: redis });

// Setup Bull Board UI
createBullBoard({
  queues: [new BullMQAdapter(followUpEmailQueue)],
  serverAdapter,
});

// Mount Bull Board to the app
app.use('/admin/queues', serverAdapter.getRouter());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/admin-auth', adminRoutes);
app.use('/api/v1/inventory', inventoryRoutes); // Base path for inventory-related routes
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/twilio', customerSupportRoutes);
app.use('/api/v1/service', serviceRoutes);
app.use('/api/v1/stripe', paypalRoutes);
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/form', formRoutes);
// Use the error handling middleware after all routes and other middleware
app.use(errorHandler);


export default app;