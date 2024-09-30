import express from 'express';
import { createPayment,executePayment,cancelPayment, paymentDetails } from '../controllers/paypalController.js';

// Initialize Express Router
const router = express.Router();

// Payment routes
router.post('/create-payment', createPayment);
router.get('/return', executePayment);
router.get('/cancel', cancelPayment);
router.post('/payment-details',paymentDetails);

export default router;
