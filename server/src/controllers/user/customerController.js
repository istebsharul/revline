import mongoose from 'mongoose';
import Customer from '../../models/customer.js';
import Order from '../../models/order.js';
import asyncErrors from '../../middlewares/catchAsyncErrors.js';
import logger from '../../utils/logger.js';
import sendMail from '../../utils/sendMail.js';
import Part from '../../models/parts.js';
import emailQueue from '../../queue/emailQueue.js';

// Get all customers
export const getAllCustomers = asyncErrors(async (req, res) => {
    try {
        // Extract page and limit from query parameters
        const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
        const limit = parseInt(req.query.limit) || 10;  // Default to 10 items per page if not provided

        // Validate page and limit
        if (page < 1 || limit < 1) {
            return res.status(400).json({ message: 'Page and limit must be greater than 0' });
        }

        // Calculate the number of documents to skip
        const skip = (page - 1) * limit;

        // Fetch customers with pagination
        const customers = await Customer.find()
            .skip(skip)
            .limit(limit);

        // Get the total number of customers for pagination info
        const totalCustomers = await Customer.countDocuments();

        // Send response with customers and pagination info
        res.json({
            customers,
            pagination: {
                totalCustomers,
                totalPages: Math.ceil(totalCustomers / limit),
                currentPage: page,
                pageSize: limit
            }
        });
        logger.info('Customer fetched using pagination');
    } catch (error) {
        logger.error('Error fetching customer', error);
        res.status(500).json({ message: error.message });
    }
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

export const createCustomer = asyncErrors(async (req, res) => {
    try {
        const { name, email, phone, zipcode, vehicleData } = req.body;

        // Run queries in parallel
        const [existingCustomer, part] = await Promise.all([
            Customer.findOne({ $or: [{ email }, { phone }] }),
            Part.findOne({ part_name: vehicleData.part })
        ]);

        // Create order
        const newOrder = new Order({
            order_summary: { ...vehicleData, part_name: vehicleData.part },
            pricing_details: { shipping_size: part.size, shipping_cost: part.shipping_cost },
            shipping_details: { customer: existingCustomer ? existingCustomer._id : null },
            order_disposition_details: { agent_notes: vehicleData.message }
        });

        let newCustomer;
        const orderInfo = {
            orderId: newOrder._id,
            requestDate: new Date(),  // Capture current date and time
            part: vehicleData.part,
        };

        // Update existing customer or create a new one
        if (existingCustomer) {
            existingCustomer.orderInfo.push(orderInfo);
            newOrder.customer = existingCustomer._id;
            newOrder.shipping_details.customer = existingCustomer._id;
            await Promise.all([existingCustomer.save(), newOrder.save()]);
        } else {
            newCustomer = new Customer({ name, email, phone, zipcode, orderInfo: [orderInfo] });
            await newCustomer.save();
            newOrder.customer = newCustomer._id;
            newOrder.shipping_details.customer = newCustomer._id;
            await newOrder.save();
        }

        // Add email to queue
        const registrationLink = `https://yourcompany.com/signup?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;
        await emailQueue.add({
            email,
            subject: 'Order Confirmation',
            message: `Please register yourself by clicking the link. ${registrationLink}\n\nBest regards,\nRevline Autoparts`
        });

        res.status(existingCustomer ? 200 : 201).json({ order: newOrder, customer: existingCustomer || newCustomer });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to create customer and order', error: error.message });
    }
});

export const updateCustomer = asyncErrors(async (req, res) => {
    try {
        const { quotationStatus } = req.body; // Expecting "Accepted" or "Rejected" status from the request body

        // Find the customer by ID and update the quotations status field
        const customer = await Customer.findById(req.params.id);

        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Update the quotation status
        customer.quotations.status = quotationStatus;

        // Save the updated customer document
        await customer.save();

        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update customer', error });
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