import nodemailer from 'nodemailer';

const sendContactMail = async ({ name, email, phoneNumber, message }) => {
    const transporter = nodemailer.createTransport({
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
        to: 'support@revlineautoparts.com',  
        subject: 'New Contact Form Submission',
        text: `
            Name: ${name}
            Email: ${email}
            Phone Number: ${phoneNumber || 'N/A'}
            Message: ${message}
        `,
    };

    await transporter.sendMail(mailOptions);
};

export default sendContactMail;