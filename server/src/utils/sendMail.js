import nodeMailer from 'nodemailer';
import logger from './logger.js';
import dotenv from 'dotenv';
dotenv.config();

export const sendMail = async (options) => {
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

    // Define a default header for HTML content
    const defaultHtmlContent = `
       <div style="width:100%; font-family: Arial, sans-serif;">
    <div style="background-color: black; text-align: center; border-radius: 20px 20px 0 0; padding:5px 20px; display: table;">
        <!-- Left Logo -->
        <div style="display: table-cell; vertical-align: middle; width: 25%;">
            <img src="https://res.cloudinary.com/dp3xz2kbh/image/upload/v1732812716/revlineautoparts/Logo/tzeavglpto0z7toihv5e.png" 
                 alt="Revline Auto Parts Logo" 
                 style="max-width: 100%; height: auto;" />
        </div>
        <!-- Tagline -->
        <div style="display: table-cell; vertical-align: middle; width: 40%; color: white; font-size: 3vh; text-align: center;">
            <span style="font-style: italic;">Rev Up <span style="color: red;">Your Drive</span><br />
            <span style="color: red;">With the</span> Best Parts</span>
        </div>
        <!-- Right GIF -->
        <div style="display: table-cell; vertical-align: middle; width: 25%;">
            <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724188616/revline/wtihz2knuki1ysvci3op.gif" 
                 alt="Loading GIF" 
                 style="max-width: 100%; height: auto;" />
        </div>
    </div>
    <pre style="padding:10px; font-family:Arial;">
        ${options.message}
    </pre>
    <footer style="background-color: black; color: white; padding: 10px; text-align: center; border-radius: 0 0 20px 20px;font-size:2vh">
        <div style="margin-bottom: 5px;">
            <a href="https://www.instagram.com/revlineautoparts" target="_blank" style="color: white; margin: 0 15px; text-decoration: none;">Instagram</a>
            <a href="https://www.facebook.com/revlineautoparts" target="_blank" style="color: white; margin: 0 15px; text-decoration: none;">Facebook</a>
            <a href="https://www.youtube.com/channel/revlineautoparts" target="_blank" style="color: white; margin: 0 15px; text-decoration: none;">YouTube</a>
        </div>
        <div>
            <span>&copy; 2025 Revline Auto Parts. All Rights Reserved.</span>
        </div>
    </footer>
</div>
    `;

    // Ensure we are sending text or a fallback message
    const plainTextMessage = options.message || 'This is the plain text version of the email content.';

    const mailOptions = {
        from: process.env.SMTP_USER,
        to: options.email,
        subject: options.subject,
        text: plainTextMessage,
        // ...(options.htmlContent && { html: options.htmlContent }),
        html: options.htmlContent || defaultHtmlContent,
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

export const sendOrdersMail = async (options) => {
    logger.info(options.email);
    logger.info(options.subject);
    logger.info(options.message);
    logger.info(options.htmlContent);
    logger.info(options.pdfStream);
    logger.info(options.filename);

    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_USER_ORDER,
        secure: true,
        auth: {
            user: process.env.SMTP_USER_ORDER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Define a default header for HTML content
    const defaultHtmlContent = `
       <div style="width:100%; font-family: Arial, sans-serif;">
    <div style="background-color: black; text-align: center; border-radius: 20px 20px 0 0; padding:5px 20px; display: table;">
        <!-- Left Logo -->
        <div style="display: table-cell; vertical-align: middle; width: 25%;">
            <img src="https://res.cloudinary.com/dp3xz2kbh/image/upload/v1732812716/revlineautoparts/Logo/tzeavglpto0z7toihv5e.png" 
                 alt="Revline Auto Parts Logo" 
                 style="max-width: 100%; height: auto;" />
        </div>
        <!-- Tagline -->
        <div style="display: table-cell; vertical-align: middle; width: 40%; color: white; font-size: 3vh; text-align: center;">
            <span style="font-style: italic;">Rev Up <span style="color: red;">Your Drive</span><br />
            <span style="color: red;">With the</span> Best Parts</span>
        </div>
        <!-- Right GIF -->
        <div style="display: table-cell; vertical-align: middle; width: 25%;">
            <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724188616/revline/wtihz2knuki1ysvci3op.gif" 
                 alt="Loading GIF" 
                 style="max-width: 100%; height: auto;" />
        </div>
    </div>
    <pre style="padding:10px; font-family:Arial;">
        ${options.message}
    </pre>
    <footer style="background-color: black; color: white; padding: 10px; text-align: center; border-radius: 0 0 20px 20px;font-size:2vh">
        <div style="margin-bottom: 5px;">
            <a href="https://www.instagram.com/revlineautoparts" target="_blank" style="color: white; margin: 0 15px; text-decoration: none;">Instagram</a>
            <a href="https://www.facebook.com/revlineautoparts" target="_blank" style="color: white; margin: 0 15px; text-decoration: none;">Facebook</a>
            <a href="https://www.youtube.com/@revlineautoparts" target="_blank" style="color: white; margin: 0 15px; text-decoration: none;">YouTube</a>
        </div>
        <div>
            <span>&copy; 2025 Revline Auto Parts. All Rights Reserved.</span>
        </div>
    </footer>
</div>
    `;

    const mailOptions = {
        from: process.env.SMTP_USER_ORDER,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.htmlContent || defaultHtmlContent,
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

export const sendSupportMail = async (options) => {
    logger.info(options.email);
    logger.info(options.subject);
    logger.info(options.message);
    logger.info(options.htmlContent);
    logger.info(options.pdfStream);
    logger.info(options.filename);

    const transporter = nodeMailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_USER_SUPPORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER_SUPPORT,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Define a default header for HTML content
    const defaultHtmlContent = `
       <div style="width:100%; font-family: Arial, sans-serif;">
    <div style="background-color: black; text-align: center; border-radius: 20px 20px 0 0; padding:5px 20px; display: table;">
        <!-- Left Logo -->
        <div style="display: table-cell; vertical-align: middle; width: 25%;">
            <img src="https://res.cloudinary.com/dp3xz2kbh/image/upload/v1732812716/revlineautoparts/Logo/tzeavglpto0z7toihv5e.png" 
                 alt="Revline Auto Parts Logo" 
                 style="max-width: 100%; height: auto;" />
        </div>
        <!-- Tagline -->
        <div style="display: table-cell; vertical-align: middle; width: 40%; color: white; font-size: 3vh; text-align: center;">
            <span style="font-style: italic;">Rev Up <span style="color: red;">Your Drive</span><br />
            <span style="color: red;">With the</span> Best Parts</span>
        </div>
        <!-- Right GIF -->
        <div style="display: table-cell; vertical-align: middle; width: 25%;">
            <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724188616/revline/wtihz2knuki1ysvci3op.gif" 
                 alt="Loading GIF" 
                 style="max-width: 100%; height: auto;" />
        </div>
    </div>
    <pre style="padding:10px; font-family:Arial;">
        ${options.message}
    </pre>
    <footer style="background-color: black; color: white; padding: 10px; text-align: center; border-radius: 0 0 20px 20px;font-size:2vh">
        <div style="margin-bottom: 5px;">
            <a href="https://www.instagram.com/revlineautoparts" target="_blank" style="color: white; margin: 0 15px; text-decoration: none;">Instagram</a>
            <a href="https://www.facebook.com/revlineautoparts" target="_blank" style="color: white; margin: 0 15px; text-decoration: none;">Facebook</a>
            <a href="https://www.youtube.com/@revlineautoparts" target="_blank" style="color: white; margin: 0 15px; text-decoration: none;">YouTube</a>
        </div>
        <div>
            <span>&copy; 2025 Revline Auto Parts. All Rights Reserved.</span>
        </div>
    </footer>
</div>
    `;

    const mailOptions = {
        from: process.env.SMTP_USER_SUPPORT,
        to: options.email,
        subject: options.subject,
        text: options.message,
        html: options.htmlContent || defaultHtmlContent,
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