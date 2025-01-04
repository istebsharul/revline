import sendMail from './sendMail.js';
import logger from './logger.js';

export const sendAccountActivationEmail = async (clientData) => {
    const { email, name, vehicleData } = clientData;
    logger.info(`Sending account activation email to ${email}`);

    const message = `
        Dear ${name},

        Welcome to Revline Auto Parts! We're thrilled to have you join our community dedicated to excellence in automotive parts and services.

        To access your new account, please set up your secure password by clicking the link below:
        Create Your Password and Complete Account Setup by clicking the link below
            www.revlineautoparts.com/signup?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}

        We have received your order for the ${vehicleData?.part} of the ${vehicleData?.year} ${vehicleData?.make} ${vehicleData?.model}.
        
        With your Revline account, you can:
            - Explore Our Catalog: Access a comprehensive range of high-quality auto parts.
            - Manage Orders: View order history and track current shipments effortlessly.
            - Enjoy Exclusive Offers: Receive personalized promotions and updates tailored to your interests.
        
        We’d also like to keep you updated about your orders, special promotions, and important updates via SMS. To opt in for SMS communication, please click here:
        
        Our team is committed to providing you with exceptional service.
        If you have any questions or need assistance, please don't hesitate to contact us at:
            - Email: support@revlineautoparts.com
            - Phone: +1 855 600 9080
        
        Thank you for choosing Revline Auto Parts. We look forward to supporting all your automotive needs with professionalism and reliability.

        Best regards,
        Adam Reed
        Customer Service Team
        Revline Auto Parts
    `;

    try {
        await sendMail({
            email,
            subject: 'Welcome to Revline Auto Parts – Complete Your Account Setup',
            message,
        });
        logger.info(`Successfully sent account activation email to ${email}`);
    } catch (error) {
        logger.error(`Failed to send account activation email to ${email}`, error);
        throw error;
    }
};

export const sendWelcomeEmail = async (clientData) => {
    const { email, name } = clientData;
    logger.info(`Sending welcome email to ${email}`);

    const message = `
        Dear ${name},

        Thank you for joining the Revline Auto Parts family! We're excited to provide you with top-quality automotive parts and exceptional customer service.

        As a valued member, you now have access to:
            - Exclusive Products: Discover a vast selection of premium auto parts suited to your needs.
            - Personalized Support: Our experts are here to assist you every step of the way.
            - Member Benefits: Enjoy special promotions, early access to sales, and more.

        To start exploring, visit the below link get and order updates :- 
            www.revlineautoparts.com/orders

        Should you need assistance, reach out to us at support@revlineautoparts.com or call us at +1 855 600 9080.

        Welcome once again, and thank you for choosing Revline Auto Parts. We're committed to driving excellence together.

        Warm regards,

        Adam Reed
        Customer Service Team
        Revline Auto Parts
    `;

    try {
        await sendMail({
            email,
            subject: `Welcome Aboard, ${name}! Your Journey with Revline Auto Parts Begins`,
            message,
        });
        logger.info(`Successfully sent welcome email to ${email}`);
    } catch (error) {
        logger.error(`Failed to send welcome email to ${email}`, error);
        throw error;
    }
};

export const sendWelcomeBackEmail = async (clientData) => {
    const { email, name, vehicleData } = clientData;
    logger.info(`Sending welcome back email to ${email}`);

    const message = `
        Dear ${name},

        Welcome back to Revline Auto Parts! We're thrilled to have you with us again. Your loyalty means the world to us, and we're committed to ensuring every experience exceeds your expectations.

        We have received your order for the ${vehicleData?.part} of the ${vehicleData?.year} ${vehicleData?.make} ${vehicleData?.model}.

        Here's what's waiting for you as a returning member:
        - Tailored Recommendations: Explore auto parts based on your past preferences and orders.
        - Exclusive Loyalty Perks: Enjoy personalized discounts and offers as a thank-you for your trust.
        - Seamless Ordering: Experience faster checkout with your saved details for effortless shopping.

        To track your current order or explore new arrivals, visit the link below:
            www.revlineautoparts.com/orders

        If you have any questions or need assistance, feel free to reach out at support@revlineautoparts.com or call us at +1 855 600 9080.

        Warm regards,
        Adam Reeds
        Customer Service Team
        Revline Auto Parts
    `;

    try {
        await sendMail({
            email,
            subject: `Welcome Back, ${name}! Your Next Journey with Revline Auto Parts`,
            message,
        });
        logger.info(`Successfully sent welcome back email to ${email}`);
    } catch (error) {
        logger.error(`Failed to send welcome back email to ${email}`, error);
        throw error;
    }
};

// another email template is being used not this one since pdf is along with email.
export const sendOrderConfirmationEmail = async (clientData) => {
    const { email, name, orderId, orderDate, shippingAddress, items, totalAmount } = clientData;
    logger.info(`Sending order confirmation email for order ${orderId} to ${email}`);

    const message = `
        Dear ${name},

        Thank you for your order! We're excited to get started on it right away.

        Order Summary:
            - Order ID: ${orderId}
            - Order Date: ${orderDate}
            - Shipping Address: ${shippingAddress}
            Items Ordered: ${items.map(item => `${item.name} – Quantity: ${item.qty}`).join('\n')}
       
            Total Amount: $${totalAmount}

        What's Next?
        Our team is processing your order. We'll notify you once it's shipped. 
        You can view your order status anytime by logging into your account.
            - www.revlineautoparts.com/login

        If you have any questions or need to make changes to your order, please contact us at support@revlineautoparts.com or call +1 855 600 9080.
        Thank you for choosing Revline Auto Parts. We're committed to providing you with the best products and service.

        Best regards,
        Adam Reed
        Customer Service Team
        Revline Auto Parts
    `;

    try {
        await sendMail({
            email,
            subject: `Order Confirmation #${orderId} – We're Processing Your Order!`,
            message,
        });
        logger.info(`Successfully sent order confirmation email for order ${orderId} to ${email}`);
    } catch (error) {
        logger.error(`Failed to send order confirmation email for order ${orderId} to ${email}`, error);
        throw error;
    }
};

export const sendProcessingUpdateEmail = async (clientData) => {
    const { email, name, orderId, estimatedShippingDate } = clientData;
    logger.info(`Sending processing update email for order ${orderId} to ${email}`);

    const message = `
        Dear ${name},

        Good news! Your order #${orderId} is currently being processed and is on schedule.

        Estimated Shipping Date: ${estimatedShippingDate}

        We'll notify you as soon as your order is shipped. 

        If you have any questions or concerns, contact us at support@revlineautoparts.com or +1 855 600 9080.

        Best regards,
        Customer Service Team
        Revline Auto Parts
    `;

    try {
        await sendMail({
            email,
            subject: `Order Update: Your Order #${orderId} is in Progress`,
            message,
        });
        logger.info(`Successfully sent processing update email for order ${orderId} to ${email}`);
    } catch (error) {
        logger.error(`Failed to send processing update email for order ${orderId} to ${email}`, error);
        throw error;
    }
};

export const sendShippingUpdateEmail = async (clientData) => {
    const { email, name, orderId, trackingLink } = clientData;
    logger.info(`Sending shipping update email for order ${orderId} to ${email}`);

    const message = `
        Dear ${name},

        Your order #${orderId} has been shipped and is on its way!

        You can track your shipment here: [Track Your Order](${trackingLink})

        If you have any questions, please contact us at support@revlineautoparts.com or +1 855 600 9080.

        Best regards,
        Customer Service Team
        Revline Auto Parts
    `;

    try {
        await sendMail({
            email,
            subject: `Shipping Update: Your Order #${orderId} is on the Way`,
            message,
        });
        logger.info(`Successfully sent shipping update email for order ${orderId} to ${email}`);
    } catch (error) {
        logger.error(`Failed to send shipping update email for order ${orderId} to ${email}`, error);
        throw error;
    }
};

export const sendDeliveryConfirmationEmail = async (clientData) => {
    const { email, name, orderId } = clientData;
    logger.info(`Sending delivery confirmation email for order ${orderId} to ${email}`);

    const message = `
        Dear ${name},

        We're happy to inform you that your order #${orderId} has been delivered successfully.

        Thank you for choosing Revline Auto Parts! We hope you enjoy your purchase.

        If you have any issues or feedback, please contact us at support@revlineautoparts.com or +1 855 600 9080.

        Best regards,
        Customer Service Team
        Revline Auto Parts
    `;

    try {
        await sendMail({
            email,
            subject: `Delivery Confirmation: Your Order #${orderId} is Complete`,
            message,
        });
        logger.info(`Successfully sent delivery confirmation email for order ${orderId} to ${email}`);
    } catch (error) {
        logger.error(`Failed to send delivery confirmation email for order ${orderId} to ${email}`, error);
        throw error;
    }
};

export const sendFeedbackRequestEmail = async (clientData) => {
    const { email, name, feedbackLink } = clientData;
    logger.info(`Sending feedback request email to ${email}`);

    const message = `
        Dear ${name},

        Thank you for your recent purchase! We'd love to hear about your experience.

        Please take a moment to share your feedback: [Submit Feedback](${feedbackLink})

        Your thoughts help us improve and continue to serve you better.

        Best regards,
        Customer Service Team
        Revline Auto Parts
    `;

    try {
        await sendMail({
            email,
            subject: 'We Value Your Feedback!',
            message,
        });
        logger.info(`Successfully sent feedback request email to ${email}`);
    } catch (error) {
        logger.error(`Failed to send feedback request email to ${email}`, error);
        throw error;
    }
};

export const sendPromotionalEmail = async (clientData) => {
    const { email, name, promoDetails } = clientData;
    logger.info(`Sending promotional email to ${email}`);

    const message = `
        Dear ${name},
        
        Exciting news! Here's an exclusive offer just for you:
        
        ${promoDetails}
        
        Hurry, this offer is available for a limited time only. Visit us now to grab your deal!
        
        Best regards,
        Customer Service Team
        Revline Auto Parts
    `;

    try {
        await sendMail({
            email,
            subject: 'Exclusive Offer Just for You!',
            message,
        });
        logger.info(`Successfully sent promotional email to ${email}`);
    } catch (error) {
        logger.error(`Failed to send promotional email to ${email}`, error);
        throw error;
    }
};

const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    return `${dateObj.toLocaleString('default', { month: 'long' })} ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${dateObj.toLocaleTimeString()}`;
}

export const sendOrderNotificationEmail = async (clientData) => {
    const { orderId, orderDate, customerName, items } = clientData;
    logger.info(`Sending order notification email for order ${orderId}`);

    // Convert orderId to string and safely get last 6 characters
    const OrderId = String(orderId || '').slice(-6) || 'N/A';

    const message = `
        Hello Team,
        We're pleased to inform you that ${customerName} has placed a new order.
        
        Order Details:
            Order ID: ${OrderId},
            Order Date: ${formatDate(orderDate)},
            Partname: ${items?.year}, ${items?.make}, ${items?.model}, ${items?.part_name}

        Please log in to the admin dashboard to process this order promptly: https://admin.revlineautoparts.com/sales-management/overview/${orderId}
        Let's continue to provide exceptional service to our customers.
        
        Best regards,
        Revline Auto Parts Team
    `;

    try {
        await sendMail({
            email: 'support@revlineautoparts.com',
            subject: `New Order Alert – Order #${OrderId} Placed by ${customerName}`,
            message,
        });
        logger.info(`Successfully sent order notification email for order ${orderId}`);
    } catch (error) {
        logger.error(`Failed to send order notification email for order ${orderId}`, error);
        throw error;
    }
};

export const sendTicketConfirmationEmail = async (clientData) => {
    const { ticketId, ticketSubject, ticketDate, customerName, orderId, email } = clientData;

    const formattedTicketDate = formatDate(ticketDate);

    logger.info(`Request received for ticket Mail`);
    const message = `
        Dear ${customerName},
        
        Thank you for reaching out to us. Your support request has been received.
            
        Ticket Details:
            Ticket ID: ${ticketId}
            Subject: ${ticketSubject}
            Date Submitted: ${formattedTicketDate}
        
        Our support team is reviewing your inquiry and will get back to you within [Expected Response Time 2-4 hours].
        In the meantime, you can view your ticket status here: https://revlineautoparts.com/orders/details/${orderId}
        
        We appreciate your patience and are here to assist you.
        
        Best regards,

        Richard Rodriguez
        Support Team
        Revline Auto Parts
    `;

    try {
        logger.info(`Sending confirmation email for Ticket ID: ${ticketId}`);

        await sendMail({
            email,
            subject: `Support Ticket # ${ticketId} – We've Received Your Request`,
            message,
        });

        logger.info(`Confirmation email sent successfully for Ticket ID: ${ticketId}`);
    } catch (error) {
        logger.error(`Failed to send confirmation email for Ticket ID: ${ticketId}. Error: ${error.message}`);
    }
};