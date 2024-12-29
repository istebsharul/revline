import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const { Schema } = mongoose;

const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter your full name'],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email'],
            unique: true,
            lowercase: true,
            validate: [validator.isEmail, 'Please enter a valid email'],
            trim: true,
        },
        contactNumber: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Please enter your password'],
            select: false, // Exclude from query results by default
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        otp: {
            type: String,
        },
        otpExpires: {
            type: Date,
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {
        timestamps: true
    }
);

// Middleware to hash the user's password before saving it to the database
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    // Hash the password with bcrypt
    this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.generateOTP = function () {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    this.otp = otp;
    this.otpExpires = Date.now() + 10 * 60 * 1000;

    return otp;
};

adminSchema.methods.validateOTP = async function (enteredOtp) {
    if (this.otp === enteredOtp && this.otpExpires > Date.now()) {
        return true;
    }
    return false;
}

// Method to compare the provided password with the stored hash
adminSchema.methods.comparePassword = async function (password) {
    console.log("Compare Password Hitttt");
    const newPass = await bcrypt.compare(password, this.password);
    console.log("From Login", password);
    console.log("From DB", this.password);
    return newPass;
};

// Method to generate a JWT token
adminSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Method to generate a password reset token
adminSchema.methods.getResetPasswordToken = function () {
    console.log("getResetTokenHitttttt");
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

// Create the User model
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
