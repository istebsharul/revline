// utils/sendGridClient.js
import sgMail from '@sendgrid/mail';
import { config } from '../config/dotenv.js';

sgMail.setApiKey(config.sendgrid.apiKey);

export default sgMail;
