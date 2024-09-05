import mongoose from 'mongoose';
import Customer from '../models/customerSchema.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import logger from '../utils/logger.js';
import sendMail from '../utils/sendMail.js';

// Get all customers
export const getAllCustomers = asyncErrors(async (req, res) => {
    const customers = await Customer.find();
    res.status(200).json(customers);
});

export const getCustomerById = asyncErrors(async (req, res) => {
    try {
        // Find the customer by ID
        const customer = await Customer.findById(req.params.id);

        // Check if customer was found
        if (!customer) {
            logger.warn(`Customer with ID ${req.params.id} not found`);
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Respond with customer data
        res.status(200).json(customer);
    } catch (error) {
        // Log the error
        logger.error(`Error retrieving customer with ID ${req.params.id}: ${error.message}`);

        // Respond with error message
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new customer
export const createCustomer = asyncErrors(async (req, res) => {
    try {
        const { name, email, phone, address, vehicleData } = req.body;

        logger.info(req.body);

        // Check if a customer with the provided email or phone already exists
        let existingCustomer = await Customer.findOne({ $or: [{ email }, { phone }] });

        if (existingCustomer) {
            // If the customer exists, add the new vehicle data to the existing vehicleData array
            existingCustomer.vehicleData = [...existingCustomer.vehicleData, ...vehicleData];

            // Save the updated customer to the database
            await existingCustomer.save();

            // Log successful update
            logger.info(`Customer updated successfully: ${existingCustomer._id}`);

            // Send email for new product added
            await sendMail({
                email: existingCustomer.email,
                subject: 'New Product Added Successfully',
                message: `Hello ${existingCustomer.name},\n\nWe have added new products to our inventory. Check them out!\n\nBest regards,\nYour Company`,
            });

            // Send response with the updated customer
            return res.status(200).json(existingCustomer);
        } else {
            // If customer does not exist, create a new customer instance
            const newCustomer = new Customer({ name, email, phone, address, vehicleData });

            // Save the new customer to the database
            await newCustomer.save();

            // Log successful creation
            logger.info(`Customer created successfully: ${newCustomer._id}`);

            // Send email for first visit

            const registrationLink = `https://yourcompany.com/register?email=${encodeURIComponent(newCustomer.email)}`;

            await sendMail({
                email: newCustomer.email,
                subject: 'Welcome to Our Service!',
                message : `Hello ${newCustomer.name},\n\nWe are looking for the best parts for you. We are excited to have you as a customer. Please register yourself using the following link to receive a quotation. We will also send it to you over email also.\n\nRegister here: ${registrationLink}\n\nBest regards,\nYour Company`
            });

            // Send response with the created customer
            return res.status(201).json(newCustomer);
        }
    } catch (error) {
        // Log the error
        logger.error('Error creating customer:', error);

        // Send error response
        res.status(500).json({ message: 'Failed to create customer', error: error.message });
    }
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
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) {
            logger.error(`Customer not found: ${req.params.id}`);
            return res.status(404).json({ message: 'Customer not found' });
        }
        logger.info(`Customer deleted successfully: ${req.params.id}`);
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting customer: ${error.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});