import asyncErrors from "../middlewares/catchAsyncErrors.js";
import logger from "./logger.js";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

/**
 * Sends an SMS via Twilio.
 * 
 * @param {object} params - The SMS parameters (to, message).
 * @returns {Promise<object>} - The result of the Twilio SMS API call.
 */
export const sendSms = asyncErrors(async ({ to, message }) => {
    if (!to || !message) {
        throw new Error("Both 'to' and 'message' fields are required.");
    }

    try {
        const sms = await twilioClient.messages.create({
            body: message,
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
        });

        logger.info(`SendSms: SMS sent successfully to ${to}, SID: ${sms.sid}`);
        return { success: true, sid: sms.sid };
    } catch (error) {
        logger.error(`SendSms: Failed to send SMS to ${to} - ${error.message}`);
    }
});
