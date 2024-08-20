import User from '../models/userModel.js';
import logger from '../utils/logger.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import sendToken from '../utils/jwt.js';
import sendMail from '../utils/sendMail.js';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

/**
 * Register a new user.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const registerUser = asyncErrors(async (req, res) => {
    const { fullName, email, contactNumber, password, zipCode } = req.body;

    // Create a new user with the provided details
    const user = await User.create({
        fullName,
        email,
        contactNumber,
        password: password, // Use password instead of password
        zipCode,
    });

    // Send token and response
    sendToken(user, 201, res);

    // Log successful registration
    logger.info(`User registered successfully: ${email}`);
});

/**
 * Log in an existing user.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const loginUser = asyncErrors(async (req, res) => {
    // console.log('Received Request Body:', req.body);
    const { email, password } = req.body;
    // logger.info(req.body);
    // logger.info(email);

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and Password are required' });
    }

    const user = await User.findOne({ email }).select('+password');

    logger.info(user);
    if (!user) {
        logger.warn(`Failed login attempt: User not found with email: ${email}`);
        return res.status(401).json({ success: false, message: `User not found with email: ${email}` });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        logger.warn(`Failed login attempt: Incorrect password for email: ${email}`);
        return res.status(401).json({ success: false, message: `Incorrect password for email: ${email}` });
    }

    sendToken(user, 200, res);

    logger.info(`User logged in successfully: ${email}`);
});

export const logoutUser = asyncErrors(async (req, res) => {
    // Destroy the user session
    req.session.destroy((err) => {
        if (err) {
            logger.error(`Failed to logout user: ${err.message}`);
            return res.status(500).json({ success: false, message: 'Failed to logout' });
        }

        // Send success response
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    });
});

export const forgotPassword = asyncErrors(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        logger.warn(`Failed password reset request: User not found with email: ${email}`);
        return res.status(404).json({ success: false, message: `User not found with email: ${email}` });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');

    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');


    // const resetToken = user.getResetPasswordToken(); //defined models/userModel
    // const resetToken = user.getResetPasswordToken();
    logger.info("Reset Token ",resetToken);
    logger.info("Hashed Reset Token ",resetPasswordToken);

    await user.save({ validateBeforeSave: false }); 

    // Set token and expiry date in the user document
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    logger.info("Saving on Db",user.resetPasswordToken)
    await user.save();

    // Send the reset token via email
    const resetUrl = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested to reset your password. Please make a PUT request to:\n\n${resetUrl}`;

    try {
        await sendMail({
            email: user.email,
            subject: 'Password Reset Request',
            message
        });

        logger.info(`Password reset token sent to email: ${email}`);
        res.status(200).json({ success: true, message: 'Password reset token sent to email' });
    } catch (error) {
        logger.error(`Failed to send password reset email: ${error.message}`);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

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

    
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() } // Ensure the token hasn't expired
    });

    if (!user) {
        logger.warn('Failed password reset attempt: Invalid or expired token');
        return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired' });
    }

    // Hash the new password and save it to the user's document
    // user.password = await bcrypt.hash(newPassword, 12);
    user.password = newPassword;
    user.resetPasswordToken = undefined; // Clear the reset token
    user.resetPasswordExpires = undefined; // Clear the expiration time

    await user.save();

    logger.info(`Password successfully reset for user: ${user.email}`);
    res.status(200).json({ success: true, message: `Password has been reset successfully${user.password}` });
});