import Order from '../models/orderModel.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import Product from '../models/productModel.js'; // Assuming you need this to calculate totalAmount

/**
 * Create a new order.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const createOrder = asyncErrors(async (req, res) => {
    const { userId, productId, quantity, shippingAddress, billingAddress, paymentMethod } = req.body;

    // Find product to calculate total amount
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    const totalAmount = product.price * quantity;

    const order = await Order.create({
        userId,
        productId,
        quantity,
        totalAmount,
        shippingAddress,
        billingAddress,
        paymentMethod
    });

    res.status(201).json({
        message: 'Order created successfully',
        order
    });
});

/**
 * Get all orders for a user.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const getUserOrders = asyncErrors(async (req, res) => {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    res.status(200).json({
        orders
    });
});

/**
 * Get a single order by ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const getOrderById = asyncErrors(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
        order
    });
});

/**
 * Update order status by ID (Admin only).
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const updateOrderStatus = asyncErrors(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'completed', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
        message: 'Order status updated successfully',
        order
    });
});

/**
 * Cancel an order by ID.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const cancelOrder = asyncErrors(async (req, res) => {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
        message: 'Order canceled successfully'
    });
});
