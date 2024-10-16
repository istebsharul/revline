import express from 'express';
import {
  createTicket,
  getAllTickets,
  updateTicket,
  deleteTicket,
  getTicketByOId,
} from '../controllers/call-support/ticketController.js'; // Adjust the import based on your directory structure

const router = express.Router();

router.post('/ticket', createTicket);
router.get('/ticket', getAllTickets);
// router.get('/ticket/:id', getTicketById);
router.patch('/ticket/:id', updateTicket);
router.delete('/ticket/:id', deleteTicket);
router.get('/order/:orderId',getTicketByOId);

export default router;
