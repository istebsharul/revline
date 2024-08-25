import mongoose from 'mongoose';

const { Schema } = mongoose;

const warrantySchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    warrantyPeriod: { type: Number, required: true }, // Warranty period in months
    warrantyStartDate: { type: Date, required: true },
    warrantyEndDate: { type: Date, required: true },
    warrantyTerms: { type: String }, // Terms and conditions of the warranty
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Warranty = mongoose.model('Warranty', warrantySchema);

export default Warranty;
