import Order from '../models/order.js';
import Customer from '../models/customer.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import logger from '../utils/logger.js';
import { sendSmsNotification } from '../utils/smsService.js';
import { sendDeliveryConfirmationEmail, sendProcessingUpdateEmail, sendReturnConfirmationEmail, sendShippingUpdateEmail } from '../utils/emailService.js';

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
    try {
        const existingCustomer = await Customer.findById(customerId).lean();

        if (!existingCustomer) {
            logger.error('Customer not found');
        }

        const isDifferent = Object.keys(newCustomerData).some((key) => {
            return newCustomerData[key] !== existingCustomer[key];
        });

        // Update only if data is different
        if (isDifferent) {
            const updatedCustomer = await Customer.findByIdAndUpdate(
                customerId,
                { $set: newCustomerData },
                { new: true }
            );

            // console.log('Customer updated:', updatedCustomer);
            return updatedCustomer;
        } else {
            console.log('Customer data is the same. No update needed.');
            return existingCustomer;
        }
    } catch (error) {
        console.log('Customer data is the same. No update needed');
        return existingCustomer;
    }
}

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

        if (newCustomerId && existingOrder.customer) {
            await updatedCustomerIfDifferent(existingOrder.customer._id, newCustomerId);
        }

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
                        data:{
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
                    console.log("Tracking Link",existingOrder.order_summary.part_code);
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

// Delete an order by ID
export const deleteOrder = asyncErrors(async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
        logger.info('Order deleted successfully', { orderId: req.params.id });
    } catch (error) {
        logger.error('Error deleting order', { orderId: req.params.id, error: error.message });
        res.status(500).json({ message: error.message });
    }
});
