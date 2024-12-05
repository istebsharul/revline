import Order from '../models/order.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import logger from '../utils/logger.js';

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
            .populate('customer', 'name email phone zipcode createdAt') // Populate only customer details you want (name, email, phone)
            .select('_id customer quotations.quote_number request_date'); // Select only the fields you need

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

export const updateOrder = asyncErrors(async (req, res) => {
    const orderId = req.params.id;
    const { order_disposition_details, ...otherDetails } = req.body;

    try {
        logger.info('Incoming update request for order:', orderId);

        // Find the order first
        const existingOrder = await Order.findById(orderId).populate('customer');

        if (!existingOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update order details with all other fields
        // Merge otherDetails into existingOrder
        Object.assign(existingOrder, otherDetails);


        // Check if `agent_notes` has changed and update disposition history
        if (order_disposition_details && order_disposition_details.agent_notes) {
            const currentNotes = existingOrder.order_disposition_details?.agent_notes || 'Not taken Properly';
            const newNotes = order_disposition_details.agent_notes;

            console.log('Current agent notes:', currentNotes);
            console.log('New agent notes:', newNotes);

            if (currentNotes !== newNotes) {
                const historyEntry = {
                    agent_notes: newNotes,
                    updated_at: new Date(),  // Capture the current time of the update
                };

                existingOrder.disposition_history.push(historyEntry);  // Add to the disposition history
                console.log('Existing History', existingOrder.disposition_history);
                console.log('Adding to disposition history:', historyEntry);
            }
        }

        // Update order_disposition_details separately if provided
        if (order_disposition_details) {
            Object.assign(existingOrder.order_disposition_details, order_disposition_details);
        }

        // Save the updated order
        const updatedOrder = await existingOrder.save();

        logger.info('Order updated successfully', { orderId });
        res.json(updatedOrder);

    } catch (error) {
        logger.error('Error updating order', { orderId, error: error.message });
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
