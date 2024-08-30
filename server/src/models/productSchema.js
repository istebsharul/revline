import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    carPart: { type: String, required: true },
    variant: { type: String, required: true },
    specification: { type: String, required: true }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;