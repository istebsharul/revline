import Order from '../models/order.js';
import Customer from '../models/customer.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import logger from '../utils/logger.js';
import { sendSmsNotification } from '../utils/smsService.js';
import { sendDeliveryConfirmationEmail, sendProcessingUpdateEmail, sendReturnConfirmationEmail, sendShippingUpdateEmail, sendPartNotAvailableEmail } from '../utils/emailService.js';

// Create a new order
export const createOrder = asyncErrors(async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
        logger.info('Order created successfully', { orderId: savedOrder._id });
    } catch (error) {
        logger.error('Error creating order', { error: error.message });
        res.status(400).json({ message: error.message });
    }
});

// Get all order with min info 
export const getAllOrders = asyncErrors(async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        if (page < 1 || limit < 1) {
            return res.status(400).json({ message: 'Page and limit must be greater than 0' });
        }

        const skip = (page - 1) * limit;

        // Fetch orders with only _id, customer details, and quote_number
        const orders = await Order.find()
            .sort({ request_date: -1 })
            .skip(skip)
            .limit(limit)
            .populate({
                path: 'customer',
                select: 'name email phone zipcode createdAt', // Select only the customer fields you need
            })
            .populate({
                path: 'payment_details', // Specify the path to the sub-document
                select: 'payment_id transaction_id payment_status amount' // Select only the fields from the payment_details you need
            })
            .select('-invoices.invoicePdf'); // Exclude the invoicePdf field from the result

        // Get the total number of orders for pagination info
        const totalOrders = await Order.countDocuments();

        // Prepare the response object
        const response = {
            orders,
            pagination: {
                totalOrders,
                totalPages: Math.ceil(totalOrders / limit),
                currentPage: page,
                pageSize: limit
            }
        };

        // Calculate and log the response size
        const responseSize = Buffer.byteLength(JSON.stringify(response), 'utf8');
        console.log(`Response size: ${responseSize} bytes`);

        // Send the response
        res.json(response);

        logger.info('Fetched orders with pagination');
    } catch (error) {
        logger.error('Error fetching orders', { error: error.message });
        res.status(500).json({ message: error.message });
    }
});


export const getOrderById = asyncErrors(async (req, res) => {
    const orderId = req.params.id;

    try {
        logger.info(`Fetching Order using ID ${orderId}`);

        // Fetch order and populate related fields
        const order = await Order.findById(orderId)
            .populate('customer')
            .populate('shipping_details.customer')
            .populate('payment_details');

        // If no order is found, return a 404 response
        if (!order) {
            logger.warn(`No Order found for OrderId ${orderId}`);
            return res.status(404).json({ message: 'No Orders found for this customer' });
        }

        // Calculate and log the response size
        const responseSize = Buffer.byteLength(JSON.stringify(order), 'utf8');

        console.log(`Order size for Id: ${responseSize} bytes`);


        // Send order data if found
        res.json(order);
        logger.info(`Order fetched successfully for OrderId ${orderId}`);

    } catch (error) {
        // Log error and send a 500 response
        logger.error('Error fetching order using OrderId', { error: error.message });
        res.status(500).json({ message: error.message });
    }
});

// Get Order using customer Id
export const getOrderByCustomerId = asyncErrors(async (req, res) => {
    const customerId = req.params.id;

    try {
        logger.info('Fetching orders by customer ID', { customerId });

        const orders = await Order.find({ customer: customerId })
            .select('_id order_disposition_details.order_status request_date order_summary');

        if (orders.length === 0) {
            logger.warn('No orders found for this customer', { customerId });
            return res.status(404).json({ message: 'No orders found for this customer' });
        }

        // Calculate and log the response size
        const responseSize = Buffer.byteLength(JSON.stringify(orders), 'utf8');
        console.log(`Order size for Id: ${responseSize} bytes`);

        res.json(orders);
        logger.info('Fetched orders successfully', { customerId, orderCount: orders.length });
    } catch (error) {
        logger.error('Error fetching orders by customer ID', { customerId, error: error.message });
        res.status(500).json({ message: error.message });
    }
});


// export const getOrderByCustomerId = asyncErrors(async (req, res) => {
//     const customerId = req.params.id;

//     try {
//         logger.info('Fetching orders by customer ID', { customerId });

//         const orders = await Order.find({ customer: customerId })
//             .populate('customer')
//             .populate('shipping_details.customer')
//             .populate('payment_details');

//         if (orders.length === 0) {
//             logger.warn('No orders found for this customer', { customerId });
//             return res.status(404).json({ message: 'No orders found for this customer' });
//         }

//         // Calculate and log the response size
//         const responseSize = Buffer.byteLength(JSON.stringify(orders), 'utf8');

//         console.log(`Order size for Id: ${responseSize} bytes`);

//         res.json(orders);
//         logger.info('Fetched orders successfully', { customerId, orderCount: orders.length });
//     } catch (error) {
//         logger.error('Error fetching orders by customer ID', { customerId, error: error.message });
//         res.status(500).json({ message: error.message });
//     }
// });

const updatedCustomerIfDifferent = async (customerId, newCustomerData) => {
    const existingCustomer = await Customer.findById(customerId).lean();
    console.log(customerId);
    console.log("New CustomerData", newCustomerData);
    console.log("Existing CustomerData", existingCustomer);

    try {
        if (!existingCustomer) {
            logger.error('Customer not found');
        }

        const isDifferent = Object.keys(newCustomerData).some((key) => {
            return newCustomerData[key] !== existingCustomer[key];
        });

        // Update only if data is different
        if (isDifferent) {
            console.log('It is Different');
            const updatedCustomer = await Customer.findByIdAndUpdate(
                customerId,
                { $set: newCustomerData },
                { new: true }
            );
            console.log("Updated Successfully.");
            // console.log('Customer updated:', updatedCustomer);
            return updatedCustomer;
        } else {
            console.log('Customer is the same. No update needed.');
            return existingCustomer;
        }
    } catch (error) {
        console.log('Customer data is the same. No update needed');
        return existingCustomer;
    }
}

const updateOrderInfo = async (customerId, orderId, part) => {
    try {
        logger.info(`Updating order info for Customer ID: ${customerId}, Order ID: ${orderId}`);

        // Find the customer and check if the order exists without a part
        const customer = await Customer.findOne({
            _id: customerId,
            "orderInfo": { 
                $elemMatch: { orderId: orderId, part: { $in: [null, "", undefined] } } 
            }
        });

        if (!customer) {
            logger.info(`Order ID: ${orderId} for Customer ID: ${customerId} already has a part name or was not found`);
            return { success: false, message: "Order already has a part name or not found" };
        }

        // Update only if part is missing
        const updatedCustomer = await Customer.findOneAndUpdate(
            { _id: customerId, "orderInfo.orderId": orderId, "orderInfo.part": { $in: [null, "", undefined] } },
            { $set: { "orderInfo.$.part": part } },
            { new: true }
        );

        if (!updatedCustomer) {
            logger.info(`Order ID: ${orderId} for Customer ID: ${customerId} not found or already has a part name`);
            return { success: false, message: "Order not found or already has a part name" };
        }

        logger.info(`Successfully updated order part for Customer ID: ${customerId}, Order ID: ${orderId}`);
        return { success: true, message: "Order part updated successfully", updatedCustomer };
    } catch (error) {
        logger.error(`Error updating order info for Customer ID: ${customerId}, Order ID: ${orderId}: ${error.message}`);
        return { success: false, message: "Internal Server Error" };
    }
};

export const updateOrder = asyncErrors(async (req, res) => {
    const orderId = req.params.id;
    const { order_disposition_details, customer: newCustomerId, ...otherDetails } = req.body;

    try {
        logger.info('Incoming update request for order:', orderId);

        // Find the order first
        const existingOrder = await Order.findById(orderId).populate('customer');

        if (!existingOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // It is used for updating customer info.
        if (newCustomerId && existingOrder.customer) {
            await updatedCustomerIfDifferent(existingOrder.customer._id, newCustomerId);
        }

        // Updating Part Name if not in Customer Order Info
        await updateOrderInfo(existingOrder.customer._id,orderId,otherDetails.order_summary?.part_name);

        // Check if `agent_notes` has changed and update disposition history
        if (order_disposition_details && order_disposition_details.agent_notes) {
            const currentNotes = existingOrder.order_disposition_details?.agent_notes || 'Not taken Properly';
            const newNotes = order_disposition_details.agent_notes;

            // console.log('Current agent notes:', currentNotes);
            // console.log('New agent notes:', newNotes);

            if (currentNotes !== newNotes) {
                const historyEntry = {
                    agent_notes: newNotes,
                    updated_at: new Date(),  // Capture the current time of the update
                };

                otherDetails.disposition_history.push(historyEntry);  // Add to the disposition history
                // console.log('In other details', otherDetails.disposition_history);
                // console.log('Existing History', existingOrder.disposition_history);
                // console.log('Adding to disposition history:', historyEntry);
            }
        }

        // Handling SMS and Emails for the respective order status
        if (order_disposition_details && order_disposition_details.order_status && order_disposition_details.order_status !== existingOrder.order_disposition_details.order_status) {
            logger.info('Order Status Updating.');

            switch (order_disposition_details.order_status) {
                case "Order Placed":
                    logger.info(`Sending 'Order Placed' SMS to ${existingOrder.customer.phone} for Order #${orderId}`);
                    sendSmsNotification({
                        type: 'order_placed',
                        to: existingOrder.customer.phone,
                        data: {
                            orderId,
                            invoiceLink: `https://revlineautoparts.com/orders/details/${orderId}`
                        }
                    });
                    // Email is being sent directly from invoice controller
                    break;  // Add 'break' here to avoid fall-through
                case "Order Processing":
                    logger.info(`Sending 'Order Processing' SMS to ${existingOrder.customer.phone} for Order #${orderId}`);
                    sendSmsNotification({
                        type: 'order_processing',
                        to: existingOrder.customer.phone,
                        data: {
                            orderId
                        }
                    });
                    sendProcessingUpdateEmail({ email: existingOrder.customer.email, name: existingOrder.customer.name, orderId });
                    break;
                case "Shipped":
                    logger.info(`Sending 'Order Shipped' SMS to ${existingOrder.customer.phone} for Order #${orderId}`);
                    sendSmsNotification({
                        type: 'order_shipped',
                        to: existingOrder.customer.phone,
                        data: {
                            orderId,
                            trackingLink: otherDetails?.order_summary?.part_code
                        }
                    });
                    console.log("Tracking Link", existingOrder.order_summary.part_code);
                    sendShippingUpdateEmail({ email: existingOrder.customer.email, name: existingOrder.customer.name, orderId, trackingLink: otherDetails?.order_summary.part_code });
                    break;  // Add 'break' here to avoid fall-through
                case "Delivered":
                    logger.info(`Sending 'Order Delivered' SMS to ${existingOrder.customer.phone} for Order #${orderId}`);
                    sendSmsNotification({
                        type: 'order_delivered',
                        to: existingOrder.customer.phone,
                        data: { orderId, feedbackLink: 'https://g.page/r/CVl0S1321maCEBM/review' }
                    });
                    sendDeliveryConfirmationEmail({ email: existingOrder.customer.email, name: existingOrder.customer.name, orderId, feedbackLink: 'https://g.page/r/CVl0S1321maCEBM/review' });
                    break;  // Add 'break' here to avoid fall-through
                case "Return Initiated":
                    logger.info(`Sending 'Return Initiated' SMS to ${existingOrder.customer.phone} for Order #${orderId}`);
                    sendSmsNotification({
                        type: 'return_initiated',
                        to: existingOrder.customer.phone,
                        data: { orderId }
                    });
                    break;  // Add 'break' here to avoid fall-through
                case "Return Received":
                    logger.info(`Sending 'Return Received' SMS to ${existingOrder.customer.phone} for Order #${orderId}`);
                    sendSmsNotification({
                        type: 'return_received',
                        to: existingOrder.customer.phone,
                        data: { orderId }
                    });
                    sendReturnConfirmationEmail({ email: existingOrder.customer.email, name: existingOrder.customer.name, })
                    break;  // Add 'break' here to avoid fall-through
                case "Refund Processed":
                    logger.info(`Sending 'Refund Processed' SMS to ${existingOrder.customer.phone} for Order #${orderId}`);
                    sendSmsNotification({
                        type: 'refund_processed',
                        to: existingOrder.customer.phone,
                        data: { orderId }
                    });
                    break;  // Add 'break' here to avoid fall-through
                case "Refund Completed":
                    logger.info(`Sending 'Refund Completed' SMS to ${existingOrder.customer.phone} for Order #${orderId}`);
                    sendSmsNotification({
                        type: 'refund_completed',  // Fixed typo 'tyep' -> 'type'
                        to: existingOrder.customer.phone,
                        data: { orderId }
                    });
                    break;  // Add 'break' here to avoid fall-through
                case "Part Not Available":
                    logger.info(`Sending 'Part Not Available' SMS to ${existingOrder.customer.phone} for Order #${orderId}`);
                    sendSmsNotification({
                        type: 'part_not_available',
                        to: existingOrder.customer.phone,
                        data: { orderId }
                    });
                    sendPartNotAvailableEmail({ name: existingOrder.customer.name, email: existingOrder.customer.email, orderId, orderSummary: existingOrder.order_summary });
                    break;  // Add 'break' here to avoid fall-through
                default:
                    logger.error(`Order Status '${order_disposition_details.status}' does not require to send SMS for Order #${orderId}`);
            }
        }

        // // // Update order_disposition_details separately if provided
        if (order_disposition_details) {
            Object.assign(existingOrder.order_disposition_details, order_disposition_details);
        }

        // Update order details with all other fields
        // Merge otherDetails into existingOrder
        Object.assign(existingOrder, otherDetails);

        // Save the updated order
        const updatedOrder = await existingOrder.save();

        logger.info('Order updated successfully', { orderId });
        res.json(updatedOrder);

    } catch (error) {
        logger.error('Error updating order', { orderId, error: error.message });
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

export const createSubOrder = asyncErrors(async (req, res) => {
    const { customerId } = req.body;

    try {
        logger.info(`Creating sub-order for customer: ${customerId}`);

        const existingCustomer = await Customer.findById(customerId);

        if (!existingCustomer) {
            logger.error(`Customer not found: ${customerId}`);
            return res.status(404).json({ message: 'Customer not found' });
        }

        const newOrder = new Order({
            customer: customerId,
            shipping_details: { customer: customerId },
        });

        const orderInfo = {
            orderId:newOrder._id,
            requestDate: new Date(),
        }

        existingCustomer.orderInfo.push(orderInfo);

        await Promise.all([existingCustomer.save(),newOrder.save()]);

        logger.info(`New order created successfully for customer: ${existingCustomer.name}, Order ID: ${newOrder._id}`);

        return res.status(201).json({ 
            message: `New Order Created successfully for ${existingCustomer.name}`, 
            customer: existingCustomer.name,
            orderInfo
        });
    } catch (error) {
        logger.error(`Error creating sub-order: ${error.message}`);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

export const createEmptyOrder = asyncErrors(async (req, res) => {
    try {
        // Step 1: Create a new customer
        const newCustomer = new Customer({
            name: "John Doe",
            email: `user_${Math.random().toString(36).substring(2, 10)}@example.com`,
            phone: "+1234567890",
            zipcode: "12345",
            smsConsent: true
        });

        await newCustomer.save();
        logger.info(`New customer created with ID: ${newCustomer._id}`);

        // Step 2: Create a new empty order and link it to the customer
        const newOrder = new Order({
            customer: newCustomer._id, // Reference customer ID in the order
            shipping_details: {
                customer_name: newCustomer.name,
                customer_email: newCustomer.email,
                customer_phone: newCustomer.phone,
                zipcode: newCustomer.zipcode
            }
        });

        await newOrder.save();
        logger.info(`New empty order created with ID: ${newOrder._id} for customer ${newCustomer._id}`);

        // Step 3: Update customer with orderInfo
        newCustomer.orderInfo.push({
            orderId: newOrder._id.toString(),  // Store order ID
            requestDate: new Date(),          // Current timestamp
            part: "",                          // Keep blank
            quoteNumber: ""                    // Keep blank
        });

        await newCustomer.save();
        logger.info(`Customer ${newCustomer._id} updated with new order info`);

        return res.status(201).json({
            message: "New Empty Order Created & Linked to Customer",
            orderId: newOrder._id,
            customer: newCustomer,
        });
    } catch (error) {
        logger.error(`Error creating customer and blank order: ${error.message}`, { error });

        return res.status(500).json({
            message: "Failed to create customer and order",
            error: error.message
        });
    }
});

// Delete an order by ID
export const deleteOrder = asyncErrors(async (req, res) => {
    const orderId = req.params.id;

    try {
        // Find and delete the order
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const customerId = order.customer;

        // Delete the order from the customer's orderInfo array
        const customerUpdate = await Customer.updateOne(
            { _id: customerId },
            { $pull: { orderInfo: { orderId: orderId } } }  // No need to slice the orderId
        );

        // Check if the customer orderInfo was updated
        if (customerUpdate.modifiedCount === 0) {
            console.log('No order found with the provided orderId to delete from customer orders list.');
        } else {
            console.log('Order deleted successfully from Customer Orders list!');
        }

        res.json({ message: 'Order deleted successfully' });
        logger.info('Order deleted successfully', { orderId: req.params.id });

    } catch (error) {
        logger.error('Error deleting order', { orderId: req.params.id, error: error.message });
        res.status(500).json({ message: error.message });
    }
});

