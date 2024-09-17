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

// Get all orders
export const getAllOrders = asyncErrors(async (req, res) => {
  try {
    const orders = await Order.find().populate('customer').populate('shipping_details.customer'); // Populate customer details if needed
    res.json(orders);
    logger.info('Fetched all orders');
  } catch (error) {
    logger.error('Error fetching orders', { error: error.message });
    res.status(500).json({ message: error.message });
  }
});

export const getOrderById = asyncErrors(async (req, res) => {
  const customerId = req.params.id;
  
  try {
    logger.info('Fetching orders by customer ID', { customerId });

    const orders = await Order.find({ customer: customerId })
                              .populate('customer')
                              .populate('shipping_details.customer');
    
    if (orders.length === 0) {
      logger.warn('No orders found for this customer', { customerId });
      return res.status(404).json({ message: 'No orders found for this customer' });
    }

    res.json(orders);
    logger.info('Fetched orders successfully', { customerId, orderCount: orders.length });
  } catch (error) {
    logger.error('Error fetching orders by customer ID', { customerId, error: error.message });
    res.status(500).json({ message: error.message });
  }
});

export const updateOrder = asyncErrors(async (req, res) => {
  const orderId = req.params.id;
  const { order_disposition_details, ...otherDetails } = req.body;

  try {
    logger.info('Incoming update request for order:', orderId);
    logger.info('Request body:', req.body);

    // Find the order first
    const existingOrder = await Order.findById(orderId).populate('customer');

    if (!existingOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    console.log("Dispo details",order_disposition_details);

    // Update order details with all other fields
    // Merge otherDetails into existingOrder
    Object.assign(existingOrder, otherDetails);
    console.log(existingOrder);
    console.log(otherDetails);

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
        console.log('Existing History',existingOrder.disposition_history);
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

// Update an order by ID
// export const updateOrder = asyncErrors(async (req, res) => {
//   try {
//     logger.info('Incoming update request for order:', req.params.id, req.body);
//     logger.info(req.body);  // Add this line for debugging
//     const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     }).populate('customer');
    
//     if (!updatedOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     res.json(updatedOrder);
//     logger.info('Order updated successfully', { orderId: req.params.id });
//   } catch (error) {
//     logger.error('Error updating order', { orderId: req.params.id, error: error.message });
//     res.status(400).json({ message: error.message });
//   }
// });

// export const updateOrder = asyncErrors(async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const { order_disposition_details } = req.body;

//     logger.info('Incoming update request for order:', orderId);
//     logger.info('Request body:', req.body);  // Add detailed logging for the request body

//     // Find the order first
//     const existingOrder = await Order.findById(orderId);

//     if (!existingOrder) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // Debugging existing order data
//     logger.info('Existing order disposition details:', existingOrder.order_disposition_details);

//     // Check if `agent_notes` has changed
//     if (order_disposition_details && order_disposition_details.agent_notes) {
//       const currentNotes = existingOrder.order_disposition_details?.agent_notes || '';

//       logger.info('Current agent notes:', currentNotes);
//       logger.info('New agent notes:', order_disposition_details.agent_notes);

//       // If agent_notes has changed, add to history
//       if (currentNotes !== order_disposition_details.agent_notes) {
//         const historyEntry = {
//           agent_notes: order_disposition_details.agent_notes,
//           updated_at: new Date(),  // Capture the current time of the update
//         };

//         logger.info('Adding to disposition history:', historyEntry);

//         existingOrder.disposition_history.push(historyEntry);  // Add to the disposition history
//       }
//     }

//     // Now update the order with the new data
//     Object.assign(existingOrder.order_disposition_details, order_disposition_details);

//     // Save the updated order
//     const updatedOrder = await existingOrder.save();

//     logger.info('Order updated successfully', { orderId });
//     res.json(updatedOrder);

//   } catch (error) {
//     logger.error('Error updating order', { orderId: req.params.id, error: error.message });
//     res.status(400).json({ message: error.message });
//   }
// });

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
