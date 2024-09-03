// controllers/emailController.js
import sgMail from '../utils/sendGridClient.js';
import { config } from '../config/dotenv.js';

export const sendEmail = (req, res) => {
    const { to, subject, text, html } = req.body;

    const msg = {
        to,
        from: config.sendgrid.email,
        subject,
        text,
        html,
    };

    sgMail
        .send(msg)
        .then(() => res.status(200).json({ message: 'Email sent!' }))
        .catch(error => res.status(500).json({ error: error.message }));
};
