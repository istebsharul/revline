import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userAuthRoutes.js';
import adminRoutes from './routes/adminAuthRoutes.js';
import errorHandler from './middlewares/error.js'; // Ensure correct import path
import cookieParser from 'cookie-parser';
import inventoryRoutes from './routes/inventoryRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import ivrRoutes from './routes/ivrRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import paypalRoutes from './routes/paymentRoutes.js';
import customerSupportRoutes from './routes/customerSupportRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import formRoutes from './routes/formRoutes.js';

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ['https://revlineautoparts.com','https://admin.revlineautoparts.com','http://localhost:3000'], // Only allow your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE'],   // Allowed methods
    credentials: true,                          // Allow cookies/auth headers
  }));
  

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is up and running!',
        timestamp: new Date(),
    });
});

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/admin-auth',adminRoutes);
app.use('/api/v1/inventory', inventoryRoutes); // Base path for inventory-related routes
app.use('/api/v1/customer', customerRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/ivr',ivrRoutes);
app.use('/api/v1/twilio',customerSupportRoutes);
app.use('/api/v1/service', serviceRoutes);
app.use('/api/v1/paypal', paypalRoutes);
app.use('/api/v1/tickets',ticketRoutes);
app.use('/api/v1/form',formRoutes);
// Use the error handling middleware after all routes and other middleware
app.use(errorHandler);


export default app;
   