// controllers/callController.js
import client from '../utils/twilioClient.js';
import { config } from '../config/dotenv.js';

export const makeCall = (req, res) => {
    const { to } = req.body;

    client.calls.create({
        url: 'http://demo.twilio.com/docs/voice.xml',  // Replace with your TwiML URL
        to,
        from: config.twilio.phoneNumber,
    })
    .then(call => res.status(200).json({ message: 'Call initiated!', sid: call.sid }))
    .catch(error => res.status(500).json({ error: error.message }));
};

export const receiveCall = (req, res) => {
    res.send(`
        <Response>
            <Say>Hello! This is a call from Twilio.</Say>
            <Play>http://demo.twilio.com/docs/classic.mp3</Play>
        </Response>
    `);
};
