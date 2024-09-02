// config/dotenv.js
import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        phoneNumber: process.env.TWILIO_PHONE_NUMBER,
    },
    sendgrid: {
        apiKey: process.env.SENDGRID_API_KEY,
        email: process.env.SENDGRID_EMAIL,
    },
};
