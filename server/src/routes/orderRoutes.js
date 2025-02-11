import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderByCustomerId
} from '../controllers/orderController.js';  // Adjust the import path as per your directory structure
import { getOrderByIdUser } from '../controllers/user/userOrderController.js';
import { createSubOrder } from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/create', createOrder);

// Create a sub order
router.post('/create-sub-order',createSubOrder);

// Get all orders
router.get('/all', getAllOrders);

// Get a specific order by ID
router.get('/:id', getOrderById);

// Get order by Order Id User
router.get('/user/:id',getOrderByIdUser);

// Get order by Customer Id
router.get('/customer/:id',getOrderByCustomerId)

// router.get('/order/:id',getSingleOrderDetails);

// Update an order by ID
router.put('/:id', updateOrder);

// Delete an order by ID
router.delete('/:id', deleteOrder);

export default router;
