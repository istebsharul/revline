import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    status: { type: String, enum: ['available', 'out of stock'] }
});

// Pre-save hook to set the status based on quantity
InventorySchema.pre('save', function (next) {
    if (this.quantity > 0) {
        this.status = 'available';
    } else {
        this.status = 'out of stock';
    }
    next();
});

const Inventory = mongoose.model('Inventory', InventorySchema);
export default Inventory;
