import mongoose from "mongoose";

const partDetailsSchema = new mongoose.Schema({
    year: Number,
    makes: [{
        name: String,
        models: [{
            name: String,
            trims: [String]  // Store trims as an array of strings
        }],
    }]
});
const PartsDetails = mongoose.model('PartsDetails', partDetailsSchema);

export default PartsDetails;