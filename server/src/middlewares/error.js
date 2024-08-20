import ErrorHandler from '../utils/errorhandler.js';
import logger from '../utils/logger.js';

/**
 * Middleware to handle errors and send appropriate error responses.
 * @param {Error} err - The error object.
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next middleware function.
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // MongoDB CastError: Invalid ID format
    if (err.name === 'CastError') {
        message = `Resource not found. Invalid: ${err.path}`;
        statusCode = 400;
        logger.error(message);
        err = new ErrorHandler(message, statusCode);
    }

    // MongoDB Duplicate Key Error: Unique field conflict
    if (err.code === 11000) {
        message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        statusCode = 400;
        logger.error(message);
        err = new ErrorHandler(message, statusCode);
    }

    // JSON Web Token Errors
    if (err.name === 'JsonWebTokenError') {
        message = 'JSON Web Token is invalid. Try again';
        statusCode = 401; // Typically 401 for authentication issues
        logger.error(message);
        err = new ErrorHandler(message, statusCode);
    }

    if (err.name === 'TokenExpiredError') {
        message = 'JSON Web Token has expired. Please log in again';
        statusCode = 401; // Typically 401 for authentication issues
        logger.error(message);
        err = new ErrorHandler(message, statusCode);
    }

    // Log the full error stack for debugging purposes
    logger.error(err.stack || err.message);

    res.status(statusCode).json({
        success: false,
        message: err.message,
    });
};

export default errorHandler;
