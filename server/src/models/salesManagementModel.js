import mongoose from 'mongoose';

const { Schema } = mongoose;

const salesManagementSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    quotation: { type: String, required: true },
    invoice: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const SalesManagement = mongoose.model('SalesManagement', salesManagementSchema);

export default SalesManagement;
