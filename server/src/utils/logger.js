import winston from 'winston';
import path from 'path';
import { format } from 'logform';

// Custom format to include caller file and line number
const customFormat = format((info) => {
    // Serialize message if it's an object
    if (typeof info.message === 'object') {
        info.message = JSON.stringify(info.message);
    }

    // Extract caller file and line number
    const stack = new Error().stack.split('\n');
    let callerInfo;

    for (let i = 0; i < stack.length; i++) {
        if (!stack[i].includes('node_modules') && !stack[i].includes('logger.js') && stack[i].match(/at\s+.*\((.*):(\d+):(\d+)\)/)) {
            const match = stack[i].match(/at\s+.*\((.*):(\d+):(\d+)\)/);
            callerInfo = {
                file: path.basename(match[1]),
                line: match[2]
            };
            break;
        }
    }

    if (!callerInfo) {
        for (let i = 0; i < stack.length; i++) {
            if (!stack[i].includes('node_modules') && !stack[i].includes('logger.js') && stack[i].match(/at\s+(.*):(\d+):(\d+)/)) {
                const match = stack[i].match(/at\s+(.*):(\d+):(\d+)/);
                callerInfo = {
                    file: path.basename(match[1]),
                    line: match[2]
                };
                break;
            }
        }
    }

    if (callerInfo) {
        info.file = callerInfo.file;
        info.line = callerInfo.line;
    } else {
        info.file = 'unknown';
        info.line = 'unknown';
    }

    return info;
});

// Define log format
const logFormat = winston.format.combine(
    customFormat(),
    winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.printf(
        (info) => {
            let logMessage = `${info.timestamp} [${info.file}:${info.line}] ${info.level}: ${info.message}`;
            if (info.stack) {
                logMessage += `\nStack trace:\n${info.stack}`;
            }
            return logMessage;
        }
    )
);

// Set the log directory path
const logDirectory = path.resolve('logs'); // Ensure this directory exists or adjust as needed

// Define transports
const consoleAndFileTransport = [
    new winston.transports.Console({
        level: 'info',
    }),
    new winston.transports.File({
        filename: path.join(logDirectory, 'revline.log'),
        level: 'debug',
    }),
    new winston.transports.File({
        filename: path.join(logDirectory, 'revline.log'),
        level: 'error',
    }),
];

const errorConsoleTransport = new winston.transports.Console({
    level: 'error',
});

// Create and export the logger
const logger = winston.createLogger({
    format: logFormat,
    transports: [...consoleAndFileTransport, errorConsoleTransport],
});

export default logger;
