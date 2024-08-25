import nodeMailer from 'nodemailer';
//we will send the mail using SMTP

const sendMail = async (options) => {

    console.log(process.env.SMTP_USER,process.env.SMTP_PASSWORD);
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
        form: process.env.SMTP_USER,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);
};

export default sendMail;