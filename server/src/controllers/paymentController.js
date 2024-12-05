import Stripe from 'stripe';
import axios from 'axios';
import Order from '../models/order.js'; // Update with your actual Order model path
import Payment from '../models/payment.js'; // Update with your actual Payment model path
import logger from '../utils/logger.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPayment = async (req, res) => {
  try {
    const { orderId } = req.body;
    console.log('Received Order ID:', orderId);
    logger.info('Creating Stripe Checkout payment for Order ID:', { orderId });

    const order = await Order.findById(orderId);
    if (!order) {
      logger.error('Order not found:', { orderId });
      throw new Error('Order not found');
    }

    // Check if a payment has already been completed
    const paymentDuplicate = await Payment.findOne({ order_id: orderId, payment_status: 'Completed' });
    if (paymentDuplicate) {
      throw new Error('Payment has already been completed');
    }

    // Check for existing canceled payment
    let payment = await Payment.findOne({ order_id: orderId, payment_status: 'Pending' });
    if (!payment) {
      payment = new Payment({
        order_id: orderId,
        payment_status: 'Pending',
        amount: order.pricing_details.quoted_price,
        currency: 'USD',
        payment_method: 'stripe',
      });
    } else {
      logger.info('Found existing pending payment for Order ID:', { orderId });
    }

    // Ensure amount is a valid number and convert to cents
    const amountInCents = Math.round(parseFloat(payment.amount) * 100);
    console.log('Amount in Cents:', amountInCents);

    // Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${order.order_summary.year} ${order.order_summary.make} ${order.order_summary.model} \n ${order.order_summary.part_name}`,

            },
            unit_amount: amountInCents, // Use the correct amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment', // Use 'payment' for one-time payments
      success_url: `https://revlineautoparts.com/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://revlineautoparts.com/payment/cancel`,
    });

    // Save payment session ID
    payment.payment_id = session.id;
    payment.token = session.id; // Can use token for tracking later
    payment.payment_status = 'Pending'; // Initially set as Pending until successful payment confirmation
    await payment.save();

    // Link payment details to the order
    await Order.findByIdAndUpdate(orderId, { payment_details: payment._id });
    await Order.findByIdAndUpdate(orderId, { 'quotations.status': 'Accepted' });

    logger.info('Stripe Checkout session created successfully:', { sessionId: session.id });

    // Return the session URL to redirect the user to Stripe Checkout
    return res.status(200).json({ checkoutUrl: session.url });

  } catch (error) {
    logger.error('Error creating Stripe Checkout payment:', error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const verifyPayment = async (req, res) => {
  console.log("Hello from Verify Payment!");
  try {
    const { session_id } = req.query;
    if (!session_id) {
      return res.status(400).json({ success: false, message: 'Session ID is required' });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    let payment = await Payment.findOne({ token: session_id });

    if (session.payment_status === 'paid') {
      payment.payment_status = 'Completed';
      payment.transaction_id = session.payment_intent;
      await payment.save();
      return res.status(200).json({ success: true, message: 'Payment successful' });
    } else {
      return res.status(400).json({ success: false, message: 'Payment not successful' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};