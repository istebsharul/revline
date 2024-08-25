import mongoose from 'mongoose';

const { Schema } = mongoose;

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Schema.Types.Decimal128, required: true },
    category: { type: String },
    images: [{ type: String }], // Array of image URLs
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
