import logger from "./logger.js";
import { sendSms } from "./sendSms.js";

/**
 * Sends an SMS based on the type of event and the provided details.
 * 
 * @param {string} type - The type of SMS to send (e.g., 'quotation', 'order_received').
 * @param {string} to - The recipient's phone number.
 * @param {object} data - The dynamic data for the SMS (e.g., quotation amount, order ID).
 */
export const sendSmsNotification = async ({type, to, data}) => {
    let message = "";

    // Define the message templates
    switch (type) {
        case "quotation":
            message = `Your quotation is ${data.amount} with shipping. For more details visit https://revlineautoparts.com/orders/details/${data.orderId} or call +1 855-600-9080 for assistance.`;
            break;
        case "order_placed":
            message = `Thanks for your order #${data.orderId.slice(-6)}! Your invoice is ready: ${data.invoiceLink}. We'll update you when it ships.`;
            break;
        case "order_processing":
            message = `We're processing your order #${data.orderId.slice(-6)}. We'll notify you once it's shipped. Questions? Call +1 855-600-9080.`;
            break;
        case "order_shipped":
            message = `Great news! Order #${data.orderId.slice(-6)} is on its way. Track it here: ${data.trackingLink}. ETA: 1-10 days.`;
            break;
        case "order_delivered":
            message = `Order #${data.orderId.slice(-6)} delivered! Share your experience: ${data.feedbackLink}. Thanks for choosing Revline!`;
            break;
        case "return_initiated":
            message = `Your return request for Order #${data.orderId.slice(-6)} is being processed. We'll notify you once it's approved. Questions? Call +1 855-600-9080.`;
            break;
        case "return_received":
            message = `We've received your return for Order #${data.orderId.slice(-6)}. Your refund will be processed within 3-7 days. Questions? Call +1 855-600-9080.`;
            break;
        case "refund_processed":
            message = `Your refund for Order #${data.orderId.slice(-6)} has been successfully processed. Amount: ${data.refundAmount}. For help, call +1 855-600-9080.`;
            break;
        case "refund_completed":
            message = `Your refund for Order #${data.orderId.slice(-6)} has been successfully completed. The amount of ${data.refundAmount} has been credited back to your original payment method. If you have any questions, please reach out to us at +1 855-600-9080. Thank you for choosing Revline!`;
            break;
        default:
            logger.error(`SendSmsNotification: Invalid SMS type - ${type}`);
    }

    // Send the SMS
    try {
        await sendSms({ to, message });
        logger.info(`SendSmsNotification: SMS sent for ${type} to ${to}`);
    } catch (error) {
        logger.error(`SendSmsNotification: Failed to send SMS for ${type} to ${to} - ${error.message}`);
    }
};
