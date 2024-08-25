import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productId: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
    quantity: { type: Number, required: true },
    totalAmount: { type: Schema.Types.Decimal128, required: true },
    status: { type: String, enum: ['pending', 'completed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    shippingAddress: { type: String, required: true },
    billingAddress: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
