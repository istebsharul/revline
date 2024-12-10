import Admin from '../models/adminSchema.js';
import logger from '../utils/logger.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import sendToken from '../utils/jwt.js';
import sendMail from '../utils/sendMail.js';
import crypto from 'crypto';

/**
 * Register a new admin.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const registerAdmin = asyncErrors(async (req, res) => {
    const { name, email, contactNumber, password, zipCode } = req.body;

    // Create a new admin with the provided details
    const admin = await Admin.create({
        name,
        email,
        contactNumber,
        password, // Use password instead of password
        zipCode,
    });

    // Send token and response
    sendToken(admin, 201, res);

    // Log successful registration
    logger.info(`Admin registered successfully: ${email}`);
});

/**
 * Log in an existing admin.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const loginAdmin = asyncErrors(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and Password are required' });
    }

    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
        logger.warn(`Failed login attempt: Admin not found with email: ${email}`);
        return res.status(401).json({ success: false, message: `Admin not found with email: ${email}` });
    }

    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
        logger.warn(`Failed login attempt: Incorrect password for email: ${email}`);
        return res.status(401).json({ success: false, message: `Incorrect password for email: ${email}` });
    }

    // Send token and response, ensure consistency in the response structure
    sendToken(admin, 200, res);

    logger.info(`Admin logged in successfully: ${email}`);
});

export const logoutAdmin = asyncErrors(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    // Log the logout action
    logger.info(`Admin logged out. IP: ${req.ip}, Time: ${new Date().toISOString()}`);

    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
});

export const adminProfile = asyncErrors(async (req, res) => {
    
    console.log("Admin Id", req.admin._id);

    const admin = await Admin.findById(req.admin._id);

    // If no admin is found, pass an error to the error handling middleware
    if (!admin) {
        logger.error('Admin not found');
        return res.status(404).json({ message: 'Admin not found' });
    }

    // If admin is found, log an info message
    logger.info(`Admin profile retrieved for username ${admin.name}`);

    // If admin is found, return admin profile
    res.status(200).json({ success: true, admin });
})

export const forgotPassword = asyncErrors(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
        logger.warn(`Failed password reset request: Admin not found with email: ${email}`);
        return res.status(404).json({ success: false, message: `Admin not found! Please Check your email` });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');

    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    logger.info("Reset Token ", resetToken);
    logger.info("Hashed Reset Token ", resetPasswordToken);

    await admin.save({ validateBeforeSave: false });

    // Set token and expiry date in the admin document
    admin.resetPasswordToken = resetPasswordToken;
    admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    logger.info("Saving on Db", admin.resetPasswordToken)
    await admin.save();

    // Send the reset token via email
    const resetUrl = `admin.revlineautoparts.com/reset-password/${resetToken}`;
    const message = `Click the link below to reset your password\n\n${resetUrl}`;

    try {
        await sendMail({
            email: admin.email,
            subject: 'Password Reset Request',
            message
        });

        logger.info(`Password reset token sent to email: ${email}`);
        res.status(200).json({ success: true, message: 'Password reset token sent to email' });
    } catch (error) {
        logger.error(`Failed to send password reset email: ${error.message}`);
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpires = undefined;
        await admin.save();

        res.status(500).json({ success: false, message: 'Failed to send password reset email' });
    }
});

export const resetPassword = asyncErrors(async (req, res) => {
    const { token } = req.params; // Get the reset token from the URL parameters
    const { newPassword } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: 'Token is missing or invalid' });
    }

    if (!newPassword) {
        return res.status(400).json({ success: false, message: 'New password is required' });
    }

    console.log('New Password:', newPassword);
    console.log('Reset Token:', token);

    // Hash the token from the URL
    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');


    const admin = await Admin.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() } // Ensure the token hasn't expired
    });

    if (!admin) {
        logger.warn('Failed password reset attempt: Invalid or expired token');
        return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired' });
    }

    // Hash the new password and save it to the admin's document
    // admin.password = await bcrypt.hash(newPassword, 12);
    admin.password = newPassword;
    admin.resetPasswordToken = undefined; // Clear the reset token
    admin.resetPasswordExpires = undefined; // Clear the expiration time

    await admin.save();

    logger.info(`Password successfully reset for admin: ${admin.email}`);
    res.status(200).json({ success: true, message: `Password has been reset successfully${admin.password}` });
});