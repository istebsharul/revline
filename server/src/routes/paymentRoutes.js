import express from 'express';
// import { createPayment,executePayment,cancelPayment, paymentDetails } from '../controllers/paypalController.js';
import { createPayment,verifyPayment } from '../controllers/paymentController.js';

// Initialize Express Router
const router = express.Router();

// Payment routes
router.post('/create-payment', createPayment);
router.get('/verify-payment', verifyPayment);
// router.get('/cancel', cancelPayment);
// router.post('/payment-details',paymentDetails);

export default router;
