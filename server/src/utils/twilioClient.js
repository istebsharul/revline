// utils/twilioClient.js
import twilio from 'twilio';
import { config } from '../config/dotenv.js';

const client = twilio(config.twilio.accountSid, config.twilio.authToken);

export default client;
