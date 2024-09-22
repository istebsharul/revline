import Ticket from '../../models/ticket.js';
import logger from '../../utils/logger.js';

const generateTicketNumber = async () => {
  let number;
  do {
    number = Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit number
  } while (await Ticket.findOne({ ticketNumber: number })); // Check for uniqueness
  return number;
};

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const { subject, description, priority, category, orderId } = req.body;
    const ticketNumber = await generateTicketNumber(); // Generate unique ticket number

    const newTicket = new Ticket({
      ticketNumber,
      subject,
      description,
      priority,
      category,
      orderId,
    });

    await newTicket.save();
    logger.info(`Ticket created: ${newTicket.ticketNumber}`); // Log ticket creation
    res.status(201).json(newTicket);
  } catch (error) {
    logger.error('Error creating ticket:', error);
    res.status(500).json({ message: 'Error creating ticket', error });
  }
};

// Get all tickets
export const getAllTickets = async (req, res) => {
  const { page = 1, limit = 30 } = req.query;

  try {
    const tickets = await Ticket.find()
      .skip((page - 1) * limit) // Skip the previous pages
      .limit(Number(limit));    // Limit the number of tickets per page

    const totalTickets = await Ticket.countDocuments(); // Get total number of tickets
    res.status(200).json({
      tickets,
      totalTickets,
      totalPages: Math.ceil(totalTickets / limit), // Calculate total pages
      currentPage: Number(page),
    });
  } catch (error) {
    logger.error('Error fetching tickets:', error);
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};


// Get all the tickets using order Id
export const getTicketByOId = async (req, res) => {
  try {
    const tickets = await Ticket.find({ orderId: req.params.orderId });
    
    if (tickets.length === 0) { // Check if the array is empty
      return res.status(404).json({ message: 'No tickets found for this order ID' });
    }

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tickets', error });
  }
};


// Get a single ticket by ID
export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate('orderId');
    if (!ticket) {
      logger.warn(`Ticket not found: ${req.params.id}`); // Log ticket not found
      return res.status(404).json({ message: 'Ticket not found' });
    }
    logger.info(`Fetched ticket: ${ticket.ticketNumber}`); // Log ticket fetch
    res.status(200).json(ticket);
  } catch (error) {
    logger.error('Error fetching ticket:', error);
    res.status(500).json({ message: 'Error fetching ticket', error });
  }
};

// Update a ticket by ID
export const updateTicket = async (req, res) => {
    // console.log(req.params.body);
  try {
    const { subject, description, priority, category, status, orderId } = req.body;
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { subject, description, priority, category, status, orderId },
      { new: true, runValidators: true }
    );

    if (!updatedTicket) {
      logger.warn(`Ticket not found for update: ${req.params.id}`); // Log ticket not found
      return res.status(404).json({ message: 'Ticket not found' });
    }

    logger.info(`Ticket updated: ${updatedTicket.ticketNumber}`); // Log ticket update
    res.status(200).json(updatedTicket);
  } catch (error) {
    logger.error('Error updating ticket:', error);
    res.status(500).json({ message: 'Error updating ticket', error });
  }
};

// Delete a ticket by ID
export const deleteTicket = async (req, res) => {
  try {
    const deletedTicket = await Ticket.findByIdAndDelete(req.params.id);
    
    if (!deletedTicket) {
      logger.warn(`Ticket not found for deletion: ${req.params.id}`); // Log ticket not found
      return res.status(404).json({ message: 'Ticket not found' });
    }
    
    logger.info(`Ticket deleted: ${deletedTicket.ticketNumber}`); // Log ticket deletion
    res.status(200).json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    logger.error('Error deleting ticket:', error);
    res.status(500).json({ message: 'Error deleting ticket', error });
  }
};
