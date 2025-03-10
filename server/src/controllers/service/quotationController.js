import {sendOrdersMail} from '../../utils/sendMail.js';
import asyncErrors from '../../middlewares/catchAsyncErrors.js';
import Order from '../../models/order.js';
import logger from '../../utils/logger.js';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import { sendSmsNotification } from '../../utils/smsService.js';
import { addFollowUpJob } from '../../queue/followUpEmailQueue.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const filePath = path.resolve(__dirname, '../../services/emailContent.html');
const readFileAsync = promisify(fs.readFile);

const generateQuoteNumber = async () => {
  let unique = false;
  let quoteNumber;

  while (!unique) {
    quoteNumber = Math.floor(100000 + Math.random() * 999999).toString();
    const existingOrder = await Order.findOne({ 'quotations.quote_number': quoteNumber });
    if (!existingOrder) unique = true;
  }

  return 'RL' + quoteNumber;
};

export const sendQuotation = asyncErrors(async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ message: 'Order ID is required.' });
  }

  try {
    const order = await Order.findById(orderId).populate('customer');
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    const customerName = order.shipping_details?.customer_name ?? order.customer.name;
    const customerEmail = order.shipping_details?.customer_email ?? order.customer.email;
    const customerPhone = order.shipping_details?.customer_phone ?? order.customer.phone;
    const { quoted_price, shipping_cost } = order.pricing_details || {};
    const quoteNumber = order?.quotations?.quote_number || await generateQuoteNumber();

    if (!customerEmail || !customerName || typeof quoted_price !== 'number' || typeof shipping_cost !== 'number' || !order.order_summary || !order.order_summary.part_name) {
      return res.status(400).json({ message: 'Missing required data.' });
    }

    const newQuotation = {
      status: 'Pending',
      quote_number: quoteNumber,
    };

    order.quotations = newQuotation;
    order.order_disposition_details.order_status = 'Awaiting Payment';
    await order.save();

    let htmlTemplate = await readFileAsync(filePath, 'utf-8');

    // Populate HTML with dynamic data
    htmlTemplate = htmlTemplate
      .replace(/{{orderId}}/g,orderId)
      .replace(/{{customerName}}/g, customerName)
      .replace(/{{customerEmail}}/g, customerEmail)
      .replace(/{{customerPhone}}/g, customerPhone)
      .replace(/{{quoteNumber}}/g, quoteNumber)
      .replace(/{{year}}/g, order?.order_summary?.year)
      .replace(/{{make}}/g, order?.order_summary?.make)
      .replace(/{{model}}/g, order?.order_summary?.model)
      .replace(/{{partName}}/g, order?.order_summary?.part_name)
      .replace(/{{quotedPrice}}/g, `$${quoted_price.toFixed(2)}`)
      .replace(/{{shippingCost}}/g, `$${shipping_cost.toFixed(2)}`)
      .replace(/{{totalCost}}/g, `$${quoted_price.toFixed(2)}`)
      .replace(/{{orderDate}}/g, new Date(order.request_date).toLocaleDateString());


    // Convert the HTML string to a Uint8Array and get its byte size
    const encoder = new TextEncoder();
    const byteArray = encoder.encode(htmlTemplate);
    const byteSize = byteArray.length/1000;

    console.log(`The size of the HTML template is: ${byteSize} kb.`);

    const mailSent = await sendOrdersMail({
      email: customerEmail,
      subject: 'Your Quotation',
      message: `Dear ${customerName}, please find attached your quotation.`,
      htmlContent: htmlTemplate,
    });

    await sendSmsNotification({type:'quotation',to:customerPhone,data: {amount:quoted_price, orderId}});

    await addFollowUpJob({orderId,quoteNumber,email:customerEmail,phone:customerPhone});

    logger.info(`Quotation sent to ${customerEmail} for ${customerName}.`);

    res.json({ message: 'Quotation sent and saved successfully!' });

  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ message: 'Failed to send quotation. Please try again later.' });
    }
  }
});

export const rejectQuotation = asyncErrors(async (req, res) => {
  const { orderId } = req.params;
  const { quotationsStatus, reason, message } = req.body;
  logger.info(`Rejecting quotation for order ${orderId}.`); 

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Update only the relevant fields in the quotations subdocument
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: {
          'quotations.status': quotationsStatus || order?.quotations?.status,
          'quotations.message': message || order?.quotations?.message,
          'order_disposition_details.order_status': 'Cancelled',
        }
      },
      { new: true } // Return the updated document
    );

    res.status(200).json({ message: 'Order updated successfully', data: updatedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error });
  }
});