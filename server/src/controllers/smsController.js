// controllers/smsController.js
import client from '../utils/twilioClient.js';
import { config } from '../config/dotenv.js';

export const sendSms = (req, res) => {
    const { to, message } = req.body;

    client.messages.create({
        body: message,
        from: config.twilio.phoneNumber,
        to,
    })
    .then(message => res.status(200).json({ message: 'SMS sent!', sid: message.sid }))
    .catch(error => res.status(500).json({ error: error.message }));
};

export const receiveSms = (req, res) => {
    const incomingMessage = req.body.Body;
    const fromNumber = req.body.From;

    console.log(`Received message: ${incomingMessage} from ${fromNumber}`);

    res.send(`
        <Response>
            <Message>Thank you for your message!</Message>
        </Response>
    `);
};
