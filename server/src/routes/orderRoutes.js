import express from 'express';
import { createOrder, getUserOrders, getOrderById, updateOrderStatus, cancelOrder } from '../controllers/orderController.js';
import { isAuthenticatedUser, authorizeRoles } from '../middlewares/auth.js';

const router = express.Router();

// Create a new order
router.post('/orders', isAuthenticatedUser, createOrder);

// Get all orders for a user
router.get('/orders/user/:userId', isAuthenticatedUser, getUserOrders);

// Get a single order by ID
router.get('/orders/:id', isAuthenticatedUser, getOrderById);

// Update order status (Admin only)
router.put('/orders/:id', isAuthenticatedUser, authorizeRoles('admin'), updateOrderStatus);

// Cancel an order
router.delete('/orders/:id', isAuthenticatedUser, authorizeRoles('admin'), cancelOrder);

export default router;
