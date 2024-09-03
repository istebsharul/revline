import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    quotation: {
        type: Schema.Types.ObjectId,
        ref: 'Quotation',
        required: true,
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
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
    invoiceUrl: {
        type: String, // URL or path to the invoice file
        required: false,
    },
}, { timestamps: true });

orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

orderSchema.index({ customer: 1, status: 1 });

export default mongoose.model('Order', orderSchema);
