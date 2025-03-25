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
    console.log("Type",type);
    console.log("To",to);
    console.log("Data",data);

    // Define the message templates
    switch (type) {
        case "activation": 
            message = `
Hi ${data.customerName}, thanks for inquiring at Revline Auto Parts!
FREE shipping on your first order is now active! Offer valid for 24 hours only – don’t miss out!`;
        break;
        case "quotation":
            message = `
Dear ${data.name},
Your quotation for ${data.part_name} is ready. 
Check your quotation here https://revlineautoparts.com/orders/details/${data.orderId} or call +1 888 632 0709 for assistance.`;
            break;
        case "order_placed":
            message = `Thanks for your order #${data.orderId.slice(-6)}! Your invoice is ready: ${data.invoiceLink}. We'll update you when it ships.`;
            break;
        case "order_processing":
            message = `We're processing your order #${data.orderId.slice(-6)}. We'll notify you once it's shipped. Questions? Call +1 888 632 0709.`;
            break;
        case "order_shipped":
            message = `Great news! Order #${data.orderId.slice(-6)} is on its way. Track it here: ${data.trackingLink}.`;
            break;
        case "order_delivered":
            message = `Order #${data.orderId.slice(-6)} delivered! We hope you enjoy your purchase of ${data.orderDetails?.part_name}. If you have any questions, feel free to reach out. Thank you for choosing Revline Auto Parts!`;
            break;
        case "return_initiated":
            message = `Your return request for Order #${data.orderId.slice(-6)} is being processed. We'll notify you once it's approved. Questions? Call +1 888 632 0709.`;
            break;
        case "return_received":
            message = `We've received your return for Order #${data.orderId.slice(-6)}. Your refund will be processed within 3-7 days. Questions? Call +1 888 632 0709.`;
            break;
        case "refund_processed":
            message = `Your refund for Order #${data.orderId.slice(-6)} has been successfully processed. Amount: ${data.refundAmount}. For help, call +1 888 632 0709.`;
            break;
        case "refund_completed":
            message = `Your refund for Order #${data.orderId.slice(-6)} has been successfully completed. The amount of ${data.refundAmount} has been credited back to your original payment method. If you have any questions, please reach out to us at +1 888 632 0709. Thank you for choosing Revline!`;
            break;
        case "part_not_available":
            message = `We're sorry, but the part you requested is currently out of stock. We'll notify you once it's available. Questions? Call +1 888 632 0709.`;
            break;
        case "follow_up":
            message = `Hi ${data?.name}, we noticed you left some auto parts in your order! 🛒Complete your purchase now: https://revlineautoparts.com/orders/details/${data.orderId} Use REVLINE10 for flat $10 OFF! 🎉 Need help? Call us anytime +1 888 632-0709.`;
            break;
        case "feedback_request":
            message = `Hi ${data?.name}, thanks for your purchase of ${data?.part_name} from Revline Auto Parts! We'd love your feedback. Leave a quick review here: https://g.page/r/CVl0S1321maCEBM/review & get $10 back! Reply when done.`
            break;
        default:
            logger.error(`SendSmsNotification: Invalid SMS type - ${type}`);
}

    // Send the SMS
    try {
        logger.info(`SendSmsNotification: Sending SMS for ${type} to ${to} and Message: ${message}`);
        await sendSms({ to, message });
        logger.info(`SendSmsNotification: SMS sent for ${type} to ${to}`);
    } catch (error) {
        logger.error(`SendSmsNotification: Failed to send SMS for ${type} to ${to} - ${error.message}`);
    }
};
