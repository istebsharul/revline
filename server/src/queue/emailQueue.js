// queue/emailQueue.js
import Queue from 'bull';
import sendMail from '../utils/sendMail.js';
import redis from '../config/redisConfig.js';
import logger from '../utils/logger.js';

// Create the email queue
const emailQueue = new Queue('emailQueue', {
    redis: {
        host: redis.options.host,
        port: redis.options.port,
        username: redis.options.username,
        password: redis.options.password,
        maxRetriesPerRequest: 50,  // Increase retry limit
        retryStrategy: (times) => {
            return Math.min(times * 50, 2000); // Set an interval for retries
        }
    }
});

// Process email jobs in the queue
emailQueue.process(async (job) => {
    const { email, subject, message } = job.data;
    try {
        await sendMail({ email, subject, message });
        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Let Bull handle the retry
    }
});
emailQueue.on('failed', (job, err) => {
    console.error(`Job failed with error: ${err.message}`);
    logger.error(`Job failed with error: ${err.message}`);
});


export default emailQueue;