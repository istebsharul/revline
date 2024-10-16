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

// export const createCustomer = asyncErrors(async (req, res) => {
//     try {
//         const { name, email, phone, zipcode, vehicleData } = req.body; // vehicleData is a single object

//         logger.info(req.body);
//         logger.info(email, phone);

//         // Check if a customer with the provided email or phone number already exists
//         let existingCustomer = await Customer.findOne({ $or: [{ email }, { phone }] });

//         let part = await Part.findOne({ part_name: vehicleData.part });

//         // Create the order object
//         const newOrder = new Order({
//             order_summary: {
//                 year: vehicleData.year,
//                 make: vehicleData.make,
//                 model: vehicleData.model,
//                 part_name: vehicleData.part,
//                 variant: vehicleData.variant,
//                 transmission: vehicleData.transmission,
//             },
//             pricing_details: {
//                 shipping_size: part.size,
//                 shipping_cost: part.shipping_cost
//             },
//             shipping_details: {
//                 customer: existingCustomer ? existingCustomer._id : null,
//             },
//             order_disposition_details: {
//                 agent_notes: vehicleData.message,
//                 // Set order status if required
//             },
//         });

//         // Save the new order
//         const savedOrder = await newOrder.save();

//         // Prepare order info object after order is saved
//         const orderInfo = {
//             orderId: savedOrder._id, // Set the order ID from the saved order
//             requestDate: savedOrder.request_date,
//             part: vehicleData.part
//         };

//         if (existingCustomer) {
//             // Customer exists, update orderInfo for this customer
//             logger.info("Welcome Back!", existingCustomer);

//             // Update the orderInfo array with the new order details
//             existingCustomer.orderInfo.push(orderInfo);
//             await existingCustomer.save(); // Save changes to the customer

//             newOrder.customer = existingCustomer._id;

//             await newOrder.save();

//             // Log successful order update
//             logger.info(`Order info updated for Customer ID: ${existingCustomer._id}`);

//             // Send email for new product added
//             await sendMail({
//                 email: existingCustomer.email,
//                 subject: 'New Product Added Successfully',
//                 message: `Hello ${existingCustomer.name},\n\nWe have added new products to your inventory. Check them out!\n\nBest regards,\nYour Company`,
//             });

//             // Calculate and log the response size
//             const customerResponseSize = Buffer.byteLength(JSON.stringify(existingCustomer), 'utf8');
//             console.log(`Existing Customer size for Id: ${customerResponseSize} bytes`);

//             // Calculate and log the response size
//             const responseSize = Buffer.byteLength(JSON.stringify(savedOrder), 'utf8');
//             console.log(`Saved Order size for Id: ${responseSize} bytes`);
//             // Send response with the updated customer and new order
//             return res.status(200).json({ customer: existingCustomer, order: savedOrder });
//         } else {
//             // If customer does not exist, create a new customer instance
//             const newCustomer = new Customer({
//                 name,
//                 email,
//                 phone,
//                 zipcode,
//                 orderInfo: [orderInfo] // Initialize orderInfo with the new order
//             });

//             // Save the new customer to the database
//             await newCustomer.save();

//             // Update the new order's customer field to reference the new customer ID
//             newOrder.customer = newCustomer._id; // Set the customer reference

//             // Save the updated new order
//             await newOrder.save();

//             // Log successful creation
//             logger.info(`Customer and Order created successfully: ${newCustomer._id}, Order ID: ${newOrder._id}`);

//             // Send email for first visit
//             const registrationLink = `https://yourcompany.com/signup?email=${encodeURIComponent(newCustomer.email)}&name=${encodeURIComponent(name)}`;

//             await sendMail({
//                 email: newCustomer.email,
//                 subject: 'Welcome to Our Service!',
//                 message: `Hello ${newCustomer.name},\n\nWe are looking for the best parts for you. We are excited to have you as a customer. Please register yourself using the following link to receive a quotation. We will also send it to you over email.\n\nRegister here: ${registrationLink}\n\nBest regards,\nYour Company`,
//             });

//             // Calculate and log the response size
//             const customerResponseSize = Buffer.byteLength(JSON.stringify(newCustomer), 'utf8');
//             console.log(`New Customer size for Id: ${customerResponseSize} bytes`);

//             // Calculate and log the response size
//             const responseSize = Buffer.byteLength(JSON.stringify(savedOrder), 'utf8');
//             console.log(`Saved Order size for Id: ${responseSize} bytes`);

//             // Send response with the created customer and order
//             return res.status(201).json({ customer: newCustomer, order: savedOrder });
//         }
//     } catch (error) {
//         // Log the error
//         logger.error('Error creating customer and order:', error);

//         // Send error response
//         res.status(500).json({ message: 'Failed to create customer and order', error: error.message });
//     }
// });


// export const createCustomer = asyncErrors(async (req, res) => {
//     try {
//         const { name, email, phone, zipcode, vehicleData } = req.body; // vehicleData is a single object

//         logger.info(req.body);
//         logger.info(email, phone);

//         // Check if a customer with the provided email or phone number already exists
//         let existingCustomer = await Customer.findOne({ $or: [{ email }, { phone }] });

//         let part = await Part.findOne({part_name:vehicleData.part});

//         if (existingCustomer) {
//             // Customer exists, create a new order for this customer
//             logger.info("Welcome Back!", existingCustomer);

//             const newOrder = new Order({
//                 customer: existingCustomer._id,
//                 order_summary: {
//                     year: vehicleData.year,
//                     make: vehicleData.make,
//                     model: vehicleData.model,
//                     part_name: vehicleData.part,
//                     variant: vehicleData.variant,
//                     transmission: vehicleData.transmission,
//                 },
//                 pricing_details:{
//                     shipping_size: part.size,
//                     shipping_cost: part.shipping_cost
//                 },
//                 shipping_details: {
//                     customer: existingCustomer._id || 'N/A',
//                 },
//                 order_disposition_details: {
//                     agent_notes: vehicleData.message,
//                     // Set order status if required
//                 },
//             });

//             // Save the new order
//             const savedOrder = await newOrder.save();

//             // Log successful creation
//             logger.info(`New Order created successfully for Customer ID: ${existingCustomer._id}, Order ID: ${savedOrder._id}`);

//             // Send email for new product added
//             await sendMail({
//                 email: existingCustomer.email,
//                 subject: 'New Product Added Successfully',
//                 message: `Hello ${existingCustomer.name},\n\nWe have added new products to your inventory. Check them out!\n\nBest regards,\nYour Company`,
//             });

//             // Send response with the updated customer and new order
//             return res.status(200).json({ customer: existingCustomer, order: savedOrder });
//         } else {
//             // If customer does not exist, create a new customer instance
//             const newCustomer = new Customer({ name, email, phone, zipcode });

//             // Save the new customer to the database
//             await newCustomer.save();

//             // Create a new order for the newly created customer based on vehicleData
//             const newOrder = new Order({
//                 customer: newCustomer._id,
//                 order_summary: {
//                     year: vehicleData.year,
//                     make: vehicleData.make,
//                     model: vehicleData.model,
//                     part_name: vehicleData.part,
//                     variant: vehicleData.variant,
//                     transmission: vehicleData.transmission,
//                 },
//                 pricing_details:{
//                     shipping_size: part.size,
//                     shipping_cost: part.shipping_cost
//                 },
//                 shipping_details: {
//                     customer: newCustomer._id || 'N/A',
//                 },
//                 order_disposition_details: {
//                     agent_notes: vehicleData.message,
//                     // Set order status if required
//                 },
//             });

//             // Save the new order
//             const savedOrder = await newOrder.save();

//             // Log successful creation
//             logger.info(`Customer and Order created successfully: ${newCustomer._id}, Order ID: ${savedOrder._id}`);

//             // Send email for first visit
//             const registrationLink = `https://yourcompany.com/signup?email=${encodeURIComponent(newCustomer.email)}&name=${encodeURIComponent(name)}`;

//             await sendMail({
//                 email: newCustomer.email,
//                 subject: 'Welcome to Our Service!',
//                 message: `Hello ${newCustomer.name},\n\nWe are looking for the best parts for you. We are excited to have you as a customer. Please register yourself using the following link to receive a quotation. We will also send it to you over email.\n\nRegister here: ${registrationLink}\n\nBest regards,\nYour Company`,
//             });

//             // Send response with the created customer and order
//             return res.status(201).json({ customer: newCustomer, order: savedOrder });
//         }
//     } catch (error) {
//         // Log the error
//         logger.error('Error creating customer and order:', error);

//         // Send error response
//         res.status(500).json({ message: 'Failed to create customer and order', error: error.message });
//     }
// });


// Update an existing customer's quotation status

// export const createCustomer = asyncErrors(async (req, res) => {
//     try {
//         const { name, email, phone, zipcode, vehicleData } = req.body;
//         logger.info(email);

//         // Run queries in parallel
//         let [existingCustomer, part] = await Promise.all([
//             Customer.findOne({ $or: [{ email }, { phone }] }),
//             Part.findOne({ part_name: vehicleData.part })
//         ]);

//         // Create order
//         const newOrder = new Order({
//             order_summary: { ...vehicleData,part_name:vehicleData.part },
//             pricing_details: { shipping_size: part.size, shipping_cost: part.shipping_cost },
//             shipping_details: { customer: existingCustomer ? existingCustomer._id : null },
//             order_disposition_details: { agent_notes: vehicleData.message }
//         });

//         let newCustomer;
//         // Update existing customer or create a new one
//         if (existingCustomer) {
//             existingCustomer.orderInfo.push({ orderId: newOrder._id, part: vehicleData.part });
//             newOrder.customer = existingCustomer._id;
//             await Promise.all([existingCustomer.save(), newOrder.save()]);
//         } else {
//             newCustomer = new Customer({ name, email, phone, zipcode, orderInfo: [{ orderId: newOrder._id, part: vehicleData.part }] });
//             await newCustomer.save();
//             newOrder.customer = newCustomer._id;
//             await newOrder.save();
//         }

//         // Send email for first visit
//         const registrationLink = `https://yourcompany.com/signup?email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}`;


//         // Send emails asynchronously
//         await sendMail({ 
//             email, 
//             subject: `Order Confirmation`, 
//             message: `Please register yourself by clicking the link attached to this mail. You will receive quotation over email and you can check that in order section after successful registration. ${registrationLink}\n\nBest regards,\n Revline Autoparts`, 
//         });

//         return res.status(existingCustomer ? 200 : 201).json({ order: newOrder, customer: existingCustomer || newCustomer });
//     } catch (error) {
//         logger.error('Error:', error);
//         return res.status(500).json({ message: 'Failed to create customer and order', error: error.message });
//     }
// });

export const createCustomer = async (req, res) => {
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
        if (existingCustomer) {
            existingCustomer.orderInfo.push({ orderId: newOrder._id, part: vehicleData.part });
            newOrder.customer = existingCustomer._id;
            await Promise.all([existingCustomer.save(), newOrder.save()]);
        } else {
            newCustomer = new Customer({
                name,
                email,
                phone,
                zipcode,
                orderInfo: [{ orderId: newOrder._id, part: vehicleData.part }]
            });
            await newCustomer.save();
            newOrder.customer = newCustomer._id;
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
};

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