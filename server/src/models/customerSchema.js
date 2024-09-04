import mongoose from 'mongoose';

const { Schema } = mongoose;

// Address Subschema (Optional)
const addressSchema = new Schema({
    street: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
    zipCode: {
        type: String,
        required: [true, 'Zip code is required'],
        trim: true,
    },
    country: {
        type: String,
        trim: true,
        },
}, { _id: false });

// Vehicle Parts Subschema
const vehiclePartSchema = new Schema({
    year: {
        type: String,
        required: [true, 'Year is required'],
        trim: true,
    },
    make: {
        type: String,
        required: [true, 'Make is required'],
        trim: true,
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
        trim: true,
    },
    carPart: {
        type: String,
        required: [true, 'Car part is required'],
        trim: true,
    },
    variant: {
        type: String,
        trim: true,
    },
    specification: {
        type: String,
        trim: true,
    },
    vin: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
    },
}, { _id: false }); // No separate ID for each part

// Main Customer Schema
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
        vehicleData: [vehiclePartSchema], // Using the vehicle parts subschema
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
