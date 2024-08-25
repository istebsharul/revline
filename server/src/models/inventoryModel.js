import mongoose from 'mongoose';

const { Schema } = mongoose;

const inventorySchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    stockQuantity: { type: Number, required: true },
    reorderLevel: { type: Number, required: true },
    supplierInfo: { type: String },
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
