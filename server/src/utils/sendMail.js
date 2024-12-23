import nodeMailer from 'nodemailer';
import logger from './logger.js';
import dotenv from 'dotenv';
dotenv.config();

const sendMail = async (options) => {
    logger.info(options.email);
    logger.info(options.subject);
    logger.info(options.message);
    logger.info(options.htmlContent);
    logger.info(options.pdfStream);
    logger.info(options.filename);
    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
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
        attachments: options.filename && options.pdfStream ? [
            {
                filename: options.filename,
                content: options.pdfStream,
                encoding: 'base64',
            },
        ] : [], // Only include attachments if both filename and pdfStream are provided
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail;
