import logger from './logger.js';

/**
 * Creates an instance of ErrorHandler.
 * @param {string} message - The error message.
 * @param {number} statusCode - The status code associated with the error.
 */
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        // Log the error creation
        logger.error(`Error created: ${message}, Status Code: ${statusCode}`);

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;
