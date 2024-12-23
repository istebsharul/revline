import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    ticketNumber: { type: String, unique: true },
    subject: String,
    description: String,
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'High' },
    category: String,
    status: { type: String, enum: ['Open', 'Closed', 'Pending'], default: 'Open' },
    orderId: { type:String, unique:true}, // Changed to orderId
    createdAt: { type: Date, default: Date.now },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
