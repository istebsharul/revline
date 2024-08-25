import mongoose from 'mongoose';

const { Schema } = mongoose;

const returnPolicySchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    returnPeriod: { type: Number, required: true }, // Return period in days
    returnConditions: { type: String }, // Conditions under which returns are accepted
    returnAddress: { type: String }, // Address where returns should be sent
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const ReturnPolicy = mongoose.model('ReturnPolicy', returnPolicySchema);

export default ReturnPolicy;
