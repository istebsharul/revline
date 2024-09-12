import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    part: { type: String, required: true },
    variant: { type: String, required: true },
    transmission: { type: String, required: true },
    description: { type: String, required: true },
    grade: { type: String, required: true },
    sku: { type: String, required: true },
    price: { type: String, required: true },
    contact: { type: String, required: true }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;