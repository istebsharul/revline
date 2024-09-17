import express from 'express';
import logger from '../utils/logger.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import {
  createPayment as createPaymentService,
  executePayment as executePaymentService,
  cancelPayment as cancelPaymentService,
} from '../services/paymentService.js';
import Payment from '../models/payment.js';

// Initialize Express Router
const router = express.Router();

// Route to create a PayPal payment
export const createPayment = asyncErrors(async (req, res) => {
  try {
    logger.info('Create Payment Request:', req.body);
    const { orderId } = req.body;

    if (!orderId) {
      logger.warn('Order Id not provided');
      return res.status(400).json({ message: 'Order Id not found' });
    }

    const { approvalUrl } = await createPaymentService(orderId);
    res.json({ approvalUrl });
  } catch (error) {
    logger.error('Error creating PayPal payment:', error);
    res.status(500).json({message:error.message});
  }
});

// Route to execute payment
export const executePayment = asyncErrors(async (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = req.query.PayerID;

  try {
    logger.info('Execute Payment Request:', { paymentId, payerId });
    const result = await executePaymentService(paymentId, payerId);
    res.json(result);
  } catch (error) {
    logger.error('Error executing PayPal payment:', error);
    res.status(500).json({ status: 'failure', message: 'Payment failed' });
  }
});

// Route to cancel payment
export const cancelPayment = asyncErrors(async (req, res) => {
  try {
    const { token } = req.query;
    logger.info(`Payment cancellation request with token: ${token}`);

    const result = await cancelPaymentService(token);
    res.json(result);
  } catch (error) {
    logger.error('Error handling PayPal cancellation:', error);
    res.status(500).json({ status: 'failure', message: 'Error handling cancellation' });
  }
});

export const paymentDetails = asyncErrors(async(req,res)=>{
  try {
    const {orderId} = req.body;

    const details = await Payment.findOne({order_id:orderId});
    logger.info('Payment Details fetched',details);
    res.json(details);
  } catch (error) {
    logger.error('Error fetching payment details',error);
    res.status(500).json({message:error.message})
  }
});


export default router;
