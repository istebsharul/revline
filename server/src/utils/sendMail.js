import nodeMailer from 'nodemailer';

const sendMail = async (options) => {
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
