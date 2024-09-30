import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    ticketNumber: { type: String, unique: true },
    subject: String,
    description: String,
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
    category: String,
    status: { type: String, enum: ['Open', 'Closed', 'Pending'], default: 'Open' },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', unique:true}, // Changed to orderId
    createdAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
