import mongoose from 'mongoose';
import Customer from '../models/customerSchema.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';

// Get all customers
export const getAllCustomers = asyncErrors(async (req, res) => {
    const customers = await Customer.find();
    res.status(200).json(customers);
});

// Get a customer by ID
export const getCustomerById = asyncErrors(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json(customer);
});

// Create a new customer
export const createCustomer = asyncErrors(async (req, res) => {
    const { name, email, phone, address, orders } = req.body;
    const newCustomer = new Customer({ name, email, phone, address, orders });
    await newCustomer.save();
    res.status(201).json(newCustomer);
});

// Update an existing customer with a transaction
export const updateCustomer = asyncErrors(async (req, res) => {
    const session = await mongoose.startSession(); // Start a session
    session.startTransaction(); // Start the transaction

    try {
        const { name, email, phone, address, orders } = req.body;

        // Use findByIdAndUpdate with a session to include this operation in the transaction
        const customer = await Customer.findByIdAndUpdate(
            req.params.id,
            { name, email, phone, address, orders },
            { new: true, session } // Pass the session to ensure atomicity
        );

        if (!customer) {
            await session.abortTransaction(); // Abort the transaction if customer not found
            return res.status(404).json({ message: 'Customer not found' });
        }

        await session.commitTransaction(); // Commit the transaction if everything is successful
        res.status(200).json(customer);
    } catch (error) {
        await session.abortTransaction(); // Abort the transaction in case of an error
        res.status(500).json({ message: 'Failed to update customer', error });
    } finally {
        session.endSession(); // End the session
    }
});

// Delete a customer
export const deleteCustomer = asyncErrors(async (req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.status(200).json({ message: 'Customer deleted successfully' });
});
