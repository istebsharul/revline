// queue/emailQueue.js
import Queue from 'bull';
import sendMail from '../utils/sendMail.js';
import redis from '../config/redisConfig.js';

// Create the email queue
const emailQueue = new Queue('emailQueue', {
    redis: {
        host: redis.options.host,
        port: redis.options.port,
        username: redis.options.username,
        password: redis.options.password 
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
});


export default emailQueue;