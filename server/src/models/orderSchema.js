import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'Quantity must be at least 1'],
            },
            price: {
                type: Number,
                required: true,
                min: [0, 'Price must be a positive number'],
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
        min: [0, 'Total amount must be a positive number'],
    },
    status: {
        type: String,
        enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update the `updatedAt` field before saving
orderSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Optional: Index to optimize queries on `customer` and `status`
orderSchema.index({ customer: 1, status: 1 });

const Order = mongoose.model('Order', orderSchema);

export default Order;
