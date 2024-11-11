import nodeMailer from 'nodemailer';
import logger from './logger.js';
import Order from '../models/order.js';

const sendMail = async (options) => {
    logger.info(options.email);
    logger.info(options.subject);
    logger.info(options.message);
    logger.info(options.htmlContent);
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: options.email,
        subject: options.subject,
        text: options.message,
        ...(options.htmlContent && { html: options.htmlContent }),
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail;
