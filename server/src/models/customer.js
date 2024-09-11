import mongoose from "mongoose";  // Corrected import statement

const CustomerSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true, 
    lowercase: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Email regex for basic validation
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  phone: { 
    type: String, 
    required: true, 
    trim: true,
    validate: {
      validator: function (v) {
        return /^\+?[1-9]\d{1,14}$/.test(v); // Basic E.164 phone number validation
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  zipcode: { 
    type: String, 
    required: true, 
    trim: true,
    validate: {
      validator: function (v) {
        return /^[0-9]{5}(?:-[0-9]{4})?$/.test(v); // US ZIP code validation (supports ZIP+4)
      },
      message: props => `${props.value} is not a valid ZIP code!`
    }
  },
  quoteNumber: {
    type: String,
    trim: true,
  },
}, { timestamps: true });  // Add timestamps option

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;  // Use ES6 syntax for export
