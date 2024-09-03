// models/quotationSchema.js
import mongoose from 'mongoose';

const QuotationSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    paymentLink: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});

const Quotation = mongoose.model('Quotation', QuotationSchema);
export default Quotation;
