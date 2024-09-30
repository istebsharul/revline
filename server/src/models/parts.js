import mongoose from 'mongoose';

const partSchema = new mongoose.Schema({
    part_name: {
        type: String,
        required: true,
    },
    shipping_cost: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    }
});

const Part = mongoose.model('Part', partSchema);

export default Part;
