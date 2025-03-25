import {sendMail, sendOrdersMail, sendSupportMail} from './sendMail.js';
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
    - Phone: +1 888 632 0709
        
Thank you for choosing Revline Auto Parts. We look forward to supporting all your automotive needs with professionalism and reliability.

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

Should you need assistance, reach out to us at support@revlineautoparts.com or call us at +1 888 632 0709.

Welcome once again, and thank you for choosing Revline Auto Parts. We're committed to driving excellence together.

Warm regards,

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

If you have any questions or need assistance, feel free to reach out at support@revlineautoparts.com or call us at +1 888 632 0709.

Warm regards,

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
        
    }
};

// another email template is being used not this one since pdf is along with email in invoice controller.
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

If you have any questions or need to make changes to your order, please contact us at support@revlineautoparts.com or call +1 888 632 0709.
Thank you for choosing Revline Auto Parts. We're committed to providing you with the best products and service.

Best regards,

Adam Reed
(+1 755 350 1908)
Sales Team
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
        
    }
};

export const sendProcessingUpdateEmail = async (clientData) => {
    const { email, name, orderId, estimatedShippingDate } = clientData;
    logger.info(`Sending processing update email for order ${orderId} to ${email}`);

    const message = `
Dear ${name},

Good news! Your order is currently being prepared by our team.

We'll notify you once it's shipped. In the meantime, you can check your order status here: https://revlineautoparts.com/orders/details/${orderId}

Thank you for your patience.
Best regards,

Sales Team
Revline Auto Parts
    `;

    try {
        await sendOrdersMail({
            email,
            subject: `Order Update: Your Order #${orderId} is in Progress`,
            message,
        });
        logger.info(`Successfully sent processing update email for order ${orderId} to ${email}`);
    } catch (error) {
        logger.error(`Failed to send processing update email for order ${orderId} to ${email}`, error);
        
    }
};

export const sendShippingUpdateEmail = async (clientData) => {
    const { email, name, orderId, trackingLink } = clientData;
    logger.info(`Sending shipping update email for order ${orderId} to ${email}`);

    const message = `
Dear ${name},

We're excited to let you know that your order is on its way!

Shipping Details:
    - Track your package here: ${trackingLink}

Thank you for choosing Revline Auto Parts. We hope you enjoy your purchase!

Best regards,
        
Sales Team
Revline Auto Parts
    `;

    try {
        await sendOrdersMail({
            email,
            subject: `Your Order #${orderId.slice(-6)} Has Shipped – Track Your Package`,
            message,
        });
        logger.info(`Successfully sent shipping update email for order ${orderId} to ${email}`);
    } catch (error) {
        logger.error(`Failed to send shipping update email for order ${orderId} to ${email}`, error);
        
    }
};

export const sendDeliveryConfirmationEmail = async (clientData) => {
    const { email, name, orderId, feedbackLink, orderDetails } = clientData;
    logger.info(`Sending delivery confirmation email for order ${orderId} to ${email}`);
    const message = `
Dear ${name},

We are pleased to confirm that your order ${orderDetails?.part_name} of ${orderDetails?.year} ${orderDetails?.make} ${orderDetails?.model} has been delivered.

We hope everything arrived in excellent condition and meets your expectations. If you have any questions or need assistance, please don't hesitate to contact us.

Enjoy your new auto parts, and thank you for choosing Revline Auto Parts!
    
Warm regards,

Adam Reed
(+1 775 350-1908)
Sales Team
Revline Auto Parts
    `;

    try {
        await sendOrdersMail({
            email,
            subject: `Your Order #[${orderId.slice(-6)}] Has Been Delivered`,
            message,
        });
        logger.info(`Successfully sent delivery confirmation email for order ${orderId} to ${email}`);
    } catch (error) {
        logger.error(`Failed to send delivery confirmation email for order ${orderId} to ${email}`, error);
        
    }
};

export const sendFeedbackRequestEmail = async (clientData) => {
    const { email, name, feedbackLink, orderDetails } = clientData;
    logger.info(`Sending feedback request email to ${email}`);
    const message = `
Hi ${name},

We hope you're loving your recent purchase — the ${orderDetails?.year} ${orderDetails?.make} ${orderDetails?.model} ${orderDetails?.part_name} — from Revline Auto Parts.

We’re always looking to improve, and your feedback plays a big role in that. If you could spare just a minute to share your experience, we’d be truly grateful.

👉 <a href="${feedbackLink}" target="_blank" style="color: blue; text-decoration: underline;">Click here to leave a review</a>

As a thank-you, we’ll send $10 back to your original payment method.

Once your review is submitted, simply reply to this email or call us at 1-888 632 0709 to let us know — and we’ll process your appreciation credit right away.

Thanks again for being part of the Revline family. We’re here if you ever need anything!

Best regards,  

Customer Experience Team 
Revline Auto Parts
    `;

    try {
        await sendMail({
            email,
            subject: `Your Opinion Matters, ${name} — Get $10 for Sharing It`,
            message,
            isHtml: true,  // Ensure your email service supports HTML
        });
        logger.info(`Successfully sent feedback request email to ${email}`);
    } catch (error) {
        logger.error(`Failed to send feedback request email to ${email}`, error);
    }
};


export const sendFollowUpEmail = async (clientData) => {
    const { name, email, orderDetails } = clientData;
    logger.info(`Sending follow up email to ${email}`);

    const message = `
Dear ${name},

We noticed you left some items in your Order. These quality auto parts are still waiting for you!

Your Items:-
    - ${orderDetails?.year}, ${orderDetails?.make}, ${orderDetails?.model}, ${orderDetails?.part_name}

Need assistance or have questions? Our team is ready to help Call Now! +1 888 632 0709.

As a special incentive, use COUPON CODE for a FLAT $10 discount on your order.

We look forward to serving you soon!

Best regards,

Adam Reed
Customer Service Team
Revline Auto Parts
    `;

    try {
        await sendMail({
            email,
            subject: `Don't Miss Out, ${name} Complete Your Purchase Today`,
            message,
        });
        logger.info(`Successfully sent promotional email to ${email}`);
    } catch (error) {
        logger.error(`Failed to send promotional email to ${email}`, error);
        
    }
};

export const sendReturnConfirmationEmail = async (clientData) =>{
    const {email,name,orderId} = clientData;
    logger.info(`Sending Return Confirmation Email to ${email}`);

    const message = `
Dear ${name},
    
We have received your returned item(s) from order #${orderId}.

Our team will inspect the returned item(s) and process your refund or exchange as per our return policy. We will update you once the process is complete.

If you have any questions, please contact us at support@revlineautoparts.com.

Thank you for your patience.

Best regards,
        
Returns Department
Revline Auto Parts
    `;

    try {
        await sendOrdersMail({
            email,
            subject:`Return Received for Order #${orderId}`,
            message
        })
    } catch (error) {
        logger.error(`Failed to send return confirmation Email`);
    }
}

const formatDate = (inputDate) => {
    const dateObj = new Date(inputDate);
    return `${dateObj.toLocaleString('default', { month: 'long' })} ${dateObj.getDate()}, ${dateObj.getFullYear()}, ${dateObj.toLocaleTimeString()}`;
}

// This mail is to admin
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
        email: process.env.SMTP_USER_ORDER,
            subject: `New Order Alert – Order #${OrderId} Placed by ${customerName}`,
            message,
        });
        logger.info(`Successfully sent order notification email for order ${orderId}`);
    } catch (error) {
        logger.error(`Failed to send order notification email for order ${orderId}`, error);
        
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

Support Team
Revline Auto Parts
    `;

    try {
        logger.info(`Sending confirmation email for Ticket ID: ${ticketId}`);

        await sendSupportMail({
            email,
            subject: `Support Ticket # ${ticketId} – We've Received Your Request`,
            message,
        });

        await sendSupportMail({
            email: 'support@revlineautoparts.com',
            subject: `New Support Ticket #${ticketId} Received from ${customerName}`,
            message: `A new support ticket has been received from ${customerName} for Order ID: ${orderId}. Please review and respond promptly.`
        });

        logger.info(`Confirmation email sent successfully for Ticket ID: ${ticketId}`);
    } catch (error) {
        logger.error(`Failed to send confirmation email for Ticket ID: ${ticketId}. Error: ${error.message}`);
    }
};

export const sendPartNotAvailableEmail = async (clientData) => {
    const { email, name, orderId, orderSummary } = clientData;
    logger.info(`Sending part not available email for order ${orderId} to ${email}`);

    const message = `
Dear ${name},

Thank you for reaching out to Revline Auto Parts. We truly appreciate your interest in our products and services.

Unfortunately, we regret to inform you that the ${orderSummary?.part_name} for the ${orderSummary?.year}, ${orderSummary?.make}, ${orderSummary?.model} is currently out of stock. We understand how important it is to get the right components for your vehicle, and we sincerely apologize for any inconvenience this may cause.

If you are in need of an alternative part or have any other questions, please don’t hesitate to contact us. Our team is here to assist you and help you find the best solution. You can reach us at +1 888 632-0709 or simply reply to this email.

Thank you again for considering Revline Auto Parts. We look forward to serving you and assisting with all your automotive needs.

Best regards,

Adam Reed
(+1 775 350 1908)
Adamreed@revlineautoparts.com
Sales Team
Revline Auto Parts
    `
    try {
        await sendOrdersMail({
            email,
            subject: `Update on Your Requested Part - ${orderSummary?.part_name} for ${orderSummary?.year}, ${orderSummary?.make}, ${orderSummary?.model}`,
            message,
        });
    } catch (error) {
        
    }
}

export const sendPurchaseOrderEmail = async (clientData) => {
    const { email, partName, year, make, model, customerAddress, customerName } = clientData;

    // Validate input data
    if (!email || !partName || !year || !make || !model || !customerAddress || !customerName) {
        console.error('Missing required client data fields', { clientData });
        return;
    }

    // Compose the email content
    const subject = `Order Confirmation for ${partName} - ${year} ${make} ${model}`;
    const message = `
Hello Dear,

I hope this message finds you well.

I am writing to confirm the order for the ${partName} for the ${year} ${make} ${model}. As we have already discussed, I would like to proceed with the purchase.

Company Information:
Company Name: Revline Auto Parts, LLC
Address: 187 E. Warm Springs Rd. Suite B NV152, Las Vegas, NV 89119
Contact Number: +1 775-350-1908
Email: Support@revlineautoparts.com

Card Details:
Name: P A Mohammed Mansoor
Card Number: 5342 7110 9075 7269
Expiration: 12/30
CVC: 827

Customer Shipping Information:
Name: ${customerName}
Address: ${customerAddress}

Part Information:
Part Requested: ${partName} for ${year} ${make} ${model}

Please provide the next steps for completing the order and the payment instructions. Let me know if any further documentation or details are required.

Looking forward to your confirmation and further instructions.

Best regards,

Mohammed Mansoor

Revline Auto Parts, LLC
Support@revlineautoparts.com
+1 775-350-1908
    `;

    // Send the email
    try {
        await sendOrdersMail({
            email,
            subject,
            message,
        });
        console.log(message);
        console.log('Order confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
    }
};