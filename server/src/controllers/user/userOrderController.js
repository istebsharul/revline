
import Order from "../../models/order.js";
import asyncErrors from "../../middlewares/catchAsyncErrors.js";
import logger from "../../utils/logger.js";

export const getOrderByIdUser = asyncErrors(async (req, res) => {
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