// src/controllers/orderController.js

import mongoose from 'mongoose';
import Order from '../models/orderSchema.js';
import Customer from '../models/customerSchema.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import logger from '../utils/logger.js';

// Create an order with transaction and proper error handling
export const createOrder = asyncErrors(async (req, res) => {
    try {
        const { customerId, items, totalAmount } = req.body;

        // Create a new order without transaction
        const newOrder = new Order({
            customer: customerId,
            items,
            totalAmount,
        });

        const savedOrder = await newOrder.save();

        // Find the customer and add the order to the customer's orders array
        const updatedCustomer = await Customer.findByIdAndUpdate(
            customerId,
            { $push: { orders: savedOrder._id } },
            { new: true }
        );

        if (!updatedCustomer) {
            throw new Error('Customer not found');
        }

        res.status(201).json(savedOrder);
    } catch (error) {
        logger.error(`Failed to create order: ${error.message}`);
        res.status(500).json({ message: 'Failed to create order', error: error.message });
    }
});

// Get all orders
export const getOrders = asyncErrors(async (req, res) => {
    try {
        const orders = await Order.find().populate('customer');
        logger.info('Fetched all orders');
        res.status(200).json(orders);
    } catch (error) {
        logger.error(`Error fetching orders: ${error.message}`);
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
});

// Get an order by ID
export const getOrderById = asyncErrors(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('customer');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        logger.info(`Fetched order: ${order._id}`);
        res.status(200).json(order);
    } catch (error) {
        logger.error(`Error fetching order: ${error.message}`);
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
});

// Update an order
export const updateOrder = asyncErrors(async (req, res) => {
    const session = await mongoose.startSession(); // Start a session
    session.startTransaction(); // Start the transaction

    try {
        const { items, totalAmount, status } = req.body;
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { items, totalAmount, status, updatedAt: Date.now() },
            { new: true, session }
        ).populate('customer');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // If all operations succeed, commit the transaction
        await session.commitTransaction();
        logger.info(`Order updated successfully: ${order._id}`);
        res.status(200).json(order);
    } catch (error) {
        // If an error occurs, abort the transaction
        await session.abortTransaction();
        logger.error(`Error updating order: ${error.message}`);
        res.status(500).json({ message: 'Error updating order', error: error.message });
    } finally {
        session.endSession(); // End the session
    }
});

// Delete an order
export const deleteOrder = asyncErrors(async (req, res) => {
    const session = await mongoose.startSession(); // Start a session
    session.startTransaction(); // Start the transaction

    try {
        const order = await Order.findByIdAndDelete(req.params.id).session(session);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Optionally: Remove order reference from customer if needed
        await Customer.updateMany(
            { orders: order._id },
            { $pull: { orders: order._id } },
            { session }
        );

        // If all operations succeed, commit the transaction
        await session.commitTransaction();
        logger.info(`Order deleted successfully: ${order._id}`);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        // If an error occurs, abort the transaction
        await session.abortTransaction();
        logger.error(`Error deleting order: ${error.message}`);
        res.status(500).json({ message: 'Error deleting order', error: error.message });
    } finally {
        session.endSession(); // End the session
    }
});
