import User from '../models/userModel.js';
import Customer from '../models/customer.js';
import logger from '../utils/logger.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import sendToken from '../utils/jwt.js';
import sendMail from '../utils/sendMail.js';
import sendContactMail from '../utils/sendContactMail.js';
import crypto from 'crypto';
import { sendWelcomeEmail } from '../utils/emailService.js';

/**
 * Register a new user.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const registerUser = asyncErrors(async (req, res) => {
    const { name, email, password,smsConsent } = req.body;

    try {
        // Log attempt to register a user
        logger.info('Attempting to register user', { name,email});

        const customer = await Customer.findOne({ email });

        if (!customer) {
            logger.warn('Registration failed: Customer not found', { email });
            return res.status(400).json({
                success: false,
                message: 'Fill up the Parts Form Before Register',
            });
        }

        customer.smsConsent = smsConsent;
        await customer.save();

        // Create a new user with the provided details
        const user = await User.create({
            name,
            email,
            phone:customer?.phone,
            password,
            customer: customer?._id
        });

        await sendWelcomeEmail({email, name});
        logger.info('Welcome email sent.');

        // Send token and response
        sendToken(user, 201, res);

        // Log successful registration
        logger.info('User registered successfully', { email, userId: user._id });
    } catch (error) {
        // Log any error that occurs during registration
        logger.error('Error registering user', { email, error: error.message });
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


/**
 * Log in an existing user.
 * @param {import('express').Request} req - The request object.
 * @param {import('express').Response} res - The response object.
 */
export const loginUser = asyncErrors(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and Password are required' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        logger.warn(`Failed login attempt: User not found with email: ${email}`);
        return res.status(401).json({ success: false, message: `User not found with email: ${email}` });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        logger.warn(`Failed login attempt: Incorrect password for email: ${email}`);
        return res.status(401).json({ success: false, message: `Incorrect password for email: ${email}` });
    }

    // Send token and response, ensure consistency in the response structure
    sendToken(user, 200, res);

    logger.info(`User logged in successfully: ${email}`);
});

export const logoutUser = asyncErrors(async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: 'logged out successfully',
    });
});

export const userProfile = asyncErrors(async (req, res) => {

    console.log("User Id", req.user._id);

    const user = await User.findById(req.user._id);

    // If no user is found, pass an error to the error handling middleware
    if (!user) {
        logger.error('User not found');
        return res.status(404).json({ message: 'User not found' });
    }

    // If user is found, log an info message
    logger.info(`User profile retrieved for username ${user.name}`);

    // If user is found, return user profile
    res.status(200).json({ success: true, user });
})

export const forgotPassword = asyncErrors(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
        logger.warn(`Failed password reset request: User not found with email: ${email}`);
        return res.status(404).json({ success: false, message: `User not found! Please Check your email` });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');

    const resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');


    // const resetToken = user.getResetPasswordToken(); //defined models/userModel
    // const resetToken = user.getResetPasswordToken();
    logger.info("Reset Token ", resetToken);
    logger.info("Hashed Reset Token ", resetPasswordToken);

    await user.save({ validateBeforeSave: false });

    // Set token and expiry date in the user document
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordExpires = Date.now() + 900000; // 1 hour

    logger.info("Saving on Db", user.resetPasswordToken)
    await user.save();

    // Send the reset token via email
    const resetUrl = `revlineautoparts.com/reset-password/${resetToken}`;
    const message = `
        Hello ${user.name},
        
        We received a request to reset your password for your revline account. If you made this request, you can reset your password by clicking the link below:
        ${resetUrl}
        If you didn’t request a password reset, please ignore this email or contact our support team if you have concerns.
        This link is valid for the next 15 min, so be sure to use it before then.

        Thank you,
        Team Revline Autoparts
        `;

    try {
        await sendMail({
            email: user.email,
            subject: 'Reset Your Password',
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

export const contactForm = asyncErrors(async (req, res) => {
    const { name, email, phoneNumber, message } = req.body;

    // Log the incoming request
    logger.info('Contact form endpoint hit');
    logger.info(`Request body: ${JSON.stringify({ name, email, phoneNumber, message })}`);

    // Validate required fields
    if (!name || !email || !message) {
        logger.warn('Validation failed: Missing required fields');
        return res.status(400).json({
            success: false,
            message: 'Required fields are missing: name, email, and message are mandatory.',
        });
    }

    try {
        // Log before sending email
        logger.info('Sending contact form email');
        await sendContactMail({ name, email, phoneNumber, message });

        // Log success
        logger.info('Contact form email sent successfully');
        res.status(200).json({
            success: true,
            message: 'Your message has been sent successfully. We will get back to you soon.',
        });
    } catch (error) {
        // Log the error for debugging
        logger.error(`Error sending contact form: ${error.message}`);

        // Respond with an error
        res.status(500).json({
            success: false,
            message: 'Failed to send your message. Please try again later.',
            error: error.message, // Optional: include error details for debugging
        });
    }
});
