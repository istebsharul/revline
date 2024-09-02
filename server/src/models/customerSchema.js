// models/customer.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Address Subschema (Optional)
const addressSchema = new Schema({
    street: {
        type: String,
        required: [true, 'Street address is required'],
        trim: true,
    },
    city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
    },
    state: {
        type: String,
        required: [true, 'State is required'],
        trim: true,
    },
    zipCode: {
        type: String,
        required: [true, 'Zip code is required'],
        trim: true,
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
        trim: true,
        default: 'USA', // Set default country if applicable
    },
}, { _id: false });

const customerSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Customer name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters long'],
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email address is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please provide a valid email address',
            ],
        },
        phone: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            match: [
                /^\+?[1-9]\d{1,14}$/,
                'Please provide a valid phone number',
            ],
        },
        address: addressSchema, // Using the address subschema
        orders: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Order',
            },
        ],
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
