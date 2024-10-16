import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';
import Payment from '../models/payment.js';
import Order from '../models/order.js';

dotenv.config();

const clientId = process.env.PAYPAL_CLIENT_ID;
const secret = process.env.PAYPAL_CLIENT_SECRET;

// Function to get PayPal access token
export const getAccessToken = async () => {
  try {
    const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');
    const response = await axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', 'grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    return response.data.access_token;
  } catch (error) {
    logger.error('Error fetching PayPal access token:', error.message);
    throw new Error('Unable to fetch access token: ' + error.message);
  }
};

// Function to create a PayPal payment
export const createPayment = async (orderId) => {
  try {
    logger.info('Creating PayPal payment for Order ID:', { orderId });

    const order = await Order.findById(orderId);
    if (!order) {
      logger.error('Order not found:', { orderId });
      throw new Error('Order not found');
    }
    let paymentDuplicate = await Payment.findOne({ order_id: orderId,payment_status:'Completed'});

    if(paymentDuplicate){
      throw new Error('Payment has already been Completed');
    }

    // Check if there's an existing payment with 'Pending' status
    let payment = await Payment.findOne({ order_id: orderId, payment_status: 'Cancelled' });

    if (!payment) {
      payment = new Payment({
        order_id: orderId,
        payment_status: 'Pending',
        amount: order.pricing_details.quoted_price,
        currency: 'USD',
        payment_method: 'paypal',
      });
    } else {
      logger.info('Found existing pending payment for Order ID:', { orderId });
    }

    const accessToken = await getAccessToken();
    const response = await axios.post('https://api.sandbox.paypal.com/v1/payments/payment', {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: payment.amount,
            currency: payment.currency,
          },
          description: 'Payment description',
        },
      ],
      redirect_urls: {
        return_url: 'http://localhost:5174/return',
        cancel_url: 'http://localhost:5174/cancel',
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const { id: paymentId, transactions, links } = response.data;
    const approvalUrl = links.find(link => link.rel === 'approval_url')?.href;
    const transaction = transactions[0];

    if (!approvalUrl) {
      logger.error('Approval URL not found in PayPal response');
      throw new Error('Approval URL not found');
    }

    // Update or create payment record
    payment.payment_id = paymentId;
    payment.amount = parseFloat(transaction.amount.total);
    payment.currency = transaction.amount.currency;
    payment.token = approvalUrl.match(/token=([A-Z0-9_-]+)/)?.[1];
    await payment.save();

    await Order.findByIdAndUpdate(orderId, { payment_details: payment._id });
    await Order.findByIdAndUpdate(orderId, { 'quotations.status': 'Accepted' });

    logger.info('Payment created or updated successfully:', { paymentId, approvalUrl });
    return { approvalUrl, paymentId };

  } catch (error) {
    logger.error('Error creating PayPal payment:', error.message);
    throw new Error('Error creating payment: ' + error.message);
  }
};


// Function to execute a PayPal payment
export const executePayment = async (paymentId, payerId) => {
  try {
    logger.info('Executing PayPal payment:', { paymentId, payerId });

    const accessToken = await getAccessToken();
    const response = await axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, {
      payer_id: payerId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const { id: transactionId } = response.data.transactions[0]?.related_resources[0]?.sale || {};
    const payerIdFromResponse = response.data.payer?.payer_info?.payer_id;

    // Find and update the payment record
    const payment = await Payment.findOne({ payment_id: paymentId });
    if (!payment) {
      throw new Error('Payment not found');
    }

    if (payment.payment_status === 'Completed') {
      logger.info('Payment already completed for Payment ID:', { paymentId });
      return { status: 'success', message: 'Payment already completed' };
    }

    
    payment.payment_status = 'Completed';
    payment.transaction_id = transactionId || payment.transaction_id;
    payment.payer_id = payerIdFromResponse || payment.payer_id;
    // payment.payment_method = paymentMethod || payment.payment_method; // If available
    await payment.save();

    // Update the order status to 'Payment Received'
    const order = await Order.findById(payment.order_id);
    if (order) {
      order.order_disposition_details.order_status = 'Payment Received';
      await order.save();
      logger.info('Order status updated to Payment Received:', { orderId: payment.order_id });
      return { status: 'success', message: 'Payment successful' };
    } else {
      throw new Error('Order not found');
    }

  } catch (error) {
    logger.error('Error executing PayPal payment:', error.message);
    throw new Error('Payment execution failed: ' + error.message);
  }
};


// Function to cancel a PayPal payment
export const cancelPayment = async (token) => {
  try {
    logger.info('Cancelling PayPal payment with token:', { token });
    console.log("Canceling for token", token);

    const payment = await Payment.findOne({ token });
    if (payment) {
      payment.payment_status = 'Cancelled';
      payment.transaction_id = token;
      await payment.save();

      const order = await Order.findById(payment.order_id);
      if (order) {
        order.order_disposition_details.order_status = 'Payment Cancelled';
        await order.save();
        logger.info('Order status updated to Payment Cancelled:', { orderId: payment.order_id });
        return { status: 'cancelled', message: 'Payment was cancelled by the user.' };
      }

      logger.error('Order not found for Payment ID:', { token });
      throw new Error('Order not found');
    } else {
      logger.error('Payment not found for Payment ID:', { token });
      throw new Error('Payment not found');
    }
  } catch (error) {
    logger.error('Error handling PayPal cancellation:', error.message);
    throw new Error('Error handling cancellation: ' + error.message);
  }
};
