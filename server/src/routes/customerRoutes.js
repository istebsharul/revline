// routes/customerRoutes.js
import { Router } from 'express';
import {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} from '../controllers/customerController.js';

const router = Router();

// Route to get all customers
router.get('/list', getAllCustomers);

// Route to get a single customer by ID
router.get('/:id', getCustomerById);

// Route to create a new customer
router.post('/create', createCustomer);

// Route to update a customer
router.put('/:id', updateCustomer);

// Route to delete a customer
router.delete('/:id', deleteCustomer);

export default router;
