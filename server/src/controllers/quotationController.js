import generatePdf from '../services/generatePdf.js';
import sendMail from '../utils/sendMail.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import Order from '../models/order.js';
import logger from '../utils/logger.js';

// Function to calculate sales tax based on location and total price
const calculateSalesTax = (totalPrice, state) => {
  const taxRates = {
    'CA': 0.075,
    'NY': 0.085,
    'TX': 0.0625,
    'FL': 0.06,
    'LA': 0.045, // Add any additional states here
  };

  const taxRate = taxRates[state] || 0; // Default to 0 if state not found
  return totalPrice * taxRate;
};

// Function to generate a unique 6-digit quote number
const generateQuoteNumber = async () => {
  let unique = false;
  let quoteNumber;

  while (!unique) {
    quoteNumber = Math.floor(100000 + Math.random() * 900000).toString();
    const existingOrder = await Order.findOne({ 'quotations.quote_number': quoteNumber });

    if (!existingOrder) {
      unique = true;
    }
  }

  return quoteNumber;
};

export const sendQuotation = asyncErrors(async (req, res) => {
  const { orderId } = req.body;

  if (!orderId) {
    return res.status(400).json({ message: 'Order ID is required.' });
  }

  try {
    // Fetch the order from the database
    const order = await Order.findById(orderId).populate('customer');

    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Use fallback logic for customer details
    const customerName = order.shipping_details?.customer_name ?? order.customer.name;
    const customerEmail = order.shipping_details?.customer_email ?? order.customer.email;
    const customerPhone = order.shipping_details?.customer_phone ?? order.customer.phone;
    const stateOrRegion = order.shipping_details?.state_or_region ?? '';

    const { quoted_price, shipping_cost } = order.pricing_details || {};

    // Check for missing required fields
    if (!customerEmail) {
      return res.status(400).json({ message: 'Customer email is required.' });
    }

    if (!customerName) {
      return res.status(400).json({ message: 'Customer name is required.' });
    }

    if (typeof quoted_price !== 'number' || typeof shipping_cost !== 'number') {
      return res.status(400).json({ message: 'Pricing details are incomplete or incorrect.' });
    }

    if (!order.order_summary || !order.order_summary.part_name) {
      return res.status(400).json({ message: 'Order summary is missing required data.' });
    }

    if(!order.shipping_details.address_line_1 || !order.shipping_details.address_line_2 || !order.shipping_details.city || !order.shipping_details.state_or_region || !order.shipping_details.country_or_region){
      return res.status(400).json({message: 'Shipping Details is Missing'})
    }

    // Generate a unique quote number
    const quoteNumber = await generateQuoteNumber();

    // Calculate sales tax
    const salesTax = calculateSalesTax(quoted_price, stateOrRegion);

    // Total amount after tax
    const totalAmount = quoted_price + shipping_cost + salesTax;

    const Address = order.shipping_details.address_line_1+' '+order.shipping_details.address_line_2;
    const Address1 = order.shipping_details.city+','+order.shipping_details.state_or_region+','+order.shipping_details.country_or_region;
    // Generate PDF using order details and quote number
    const pdfBuffer = await generatePdf({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      customer_address:Address,
      customer_address1:Address1,
      order_summary: order.order_summary,
      quoted_price,
      quote_date: new Date().toISOString().split('T')[0],
      shipping_cost,
      salesTax,
      totalAmount,
      quote_number:quoteNumber, // Add quote number to PDF
    }); // Assume generatePdf returns a Buffer

    // Create or update the quotation
    const newQuotation = {
      status: 'Pending',
      quote_number: quoteNumber, // Add quote number here
      quotationPdf: {
        data: pdfBuffer,
        contentType: 'application/pdf',
      },
    };

    // Set the new quotation (overwrite if it exists)
    order.quotations = newQuotation;

    // Save the updated order document
    await order.save();

    // Send Email with PDF attachment
    const mailSent = await sendMail({
      email: customerEmail,
      subject: 'Your Quotation',
      message: `Dear ${customerName}, please find attached your quotation.`,
      filename: 'quotation.pdf',
      pdfStream: pdfBuffer, // Pass Buffer here
    });

    logger.info(customerEmail, customerName, pdfBuffer);

    // Send success response
    res.json({ message: 'Quotation sent and saved successfully!' });

  } catch (error) {
    console.error(error);
    // Ensure only one response is sent
    if (!res.headersSent) {
      res.status(500).json({ message: 'Failed to send quotation. Please try again later.' });
    }
  }
});
