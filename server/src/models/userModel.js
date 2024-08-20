import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        fullName: {
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
            required: [true, 'Please enter your contact number'],
            trim: true,
        },
        passwordHash: {
            type: String,
            required: [true, 'Please enter your password'],
            select: false, // Exclude from query results by default
        },
        zipCode: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin'], // Define allowed roles
            default: 'user', // Default role
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    {
        timestamps:true
    }
);

// Middleware to hash the user's password before saving it to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) {
        next();
    }

    // Hash the password with bcrypt
    this.passwordHash = await bcrypt.hash(this.passwordHash, 10);
});

// Method to compare the provided password with the stored hash
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.passwordHash);
};

// Method to generate a JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

// Method to generate a password reset token
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
};

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
