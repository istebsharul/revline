import generateInvoice from '../../services/generateInvoice.js';
import sendMail from '../../utils/sendMail.js';
import asyncErrors from '../../middlewares/catchAsyncErrors.js';
import Order from '../../models/order.js';
import logger from '../../utils/logger.js';

// Function to calculate sales tax based on location and total price
const calculateSalesTax = (totalPrice, state) => {
  const taxRates = {
    'AL': 0.04,    // Alabama
    'AK': 0,       // Alaska
    'AZ': 0.056,   // Arizona
    'AR': 0.065,   // Arkansas
    'CA': 0.0725,  // California
    'CO': 0.029,   // Colorado
    'CT': 0.0635,  // Connecticut
    'DE': 0,       // Delaware
    'FL': 0.06,    // Florida
    'GA': 0.04,    // Georgia
    'HI': 0.04,    // Hawaii
    'ID': 0.06,    // Idaho
    'IL': 0.0625,  // Illinois
    'IN': 0.07,    // Indiana
    'IA': 0.06,    // Iowa
    'KS': 0.065,   // Kansas
    'KY': 0.06,    // Kentucky
    'LA': 0.0445,  // Louisiana
    'ME': 0.055,   // Maine
    'MD': 0.06,    // Maryland
    'MA': 0.0625,  // Massachusetts
    'MI': 0.06,    // Michigan
    'MN': 0.0688,  // Minnesota
    'MS': 0.07,    // Mississippi
    'MO': 0.0423,  // Missouri
    'MT': 0,       // Montana
    'NE': 0.055,   // Nebraska
    'NV': 0.0685,  // Nevada
    'NH': 0,       // New Hampshire
    'NJ': 0.06625, // New Jersey
    'NM': 0.05125, // New Mexico
    'NY': 0.04,    // New York
    'NC': 0.0475,  // North Carolina
    'ND': 0.05,    // North Dakota
    'OH': 0.0575,  // Ohio
    'OK': 0.045,   // Oklahoma
    'OR': 0,       // Oregon
    'PA': 0.06,    // Pennsylvania
    'RI': 0.07,    // Rhode Island
    'SC': 0.06,    // South Carolina
    'SD': 0.045,   // South Dakota
    'TN': 0.07,    // Tennessee
    'TX': 0.0625,  // Texas
    'UT': 0.0485,  // Utah
    'VT': 0.06,    // Vermont
    'VA': 0.053,   // Virginia
    'WA': 0.065,   // Washington
    'WV': 0.06,    // West Virginia
    'WI': 0.05,    // Wisconsin
    'WY': 0.04,    // Wyoming
  };


  const taxRate = taxRates[state] || 0; // Default to 0 if state not found
  return totalPrice * taxRate;
};

// Function to generate a unique invoice number
const generateInvoiceNumber = async () => {
  let unique = false;
  let invoiceNumber;

  while (!unique) {
    invoiceNumber = Math.floor(100000 + Math.random() * 900000).toString();
    const existingOrder = await Order.findOne({ 'invoices.invoice_number': invoiceNumber });

    if (!existingOrder) {
      unique = true;
    }
  }

  return invoiceNumber;
};

// Controller function to send an invoice
export const sendInvoice = asyncErrors(async (req, res) => {
  const { orderId, paymentMode } = req.body;

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

    if (!order.shipping_details.address_line_1 || !order.shipping_details.address_line_2 || !order.shipping_details.city || !order.shipping_details.state_or_region || !order.shipping_details.country_or_region) {
      return res.status(400).json({ message: 'Shipping details are missing.' });
    }

    // Generate a unique invoice number
    const invoiceNumber = await generateInvoiceNumber();

    // Total amount after tax (assuming you have a calculateSalesTax function like before)
    const salesTax = calculateSalesTax(quoted_price, stateOrRegion);
    const totalAmount = quoted_price + shipping_cost + salesTax;

    const address = `${order.shipping_details.address_line_1} ${order.shipping_details.address_line_2}`;
    const address1 = `${order.shipping_details.city}, ${order.shipping_details.state_or_region}, ${order.shipping_details.country_or_region}`;

    // Generate PDF for invoice using order details and invoice number
    const pdfBuffer = await generateInvoice({
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      customer_address: address,
      customer_address1: address1,
      order_summary: order.order_summary,
      quoted_price,
      invoice_date: new Date().toISOString().split('T')[0],
      shipping_cost,
      salesTax,
      totalAmount,
      invoice_number: invoiceNumber,
      payment_mode: paymentMode, // Payment mode from the request
      transaction_id: order.billing_details.transaction_id, // Assuming this field exists in billing_details
    });

    // Create a new invoice
    const newInvoice = {
      status: 'Paid', // Or 'Pending' depending on your flow
      invoice_number: invoiceNumber,
      invoicePdf: {
        data: pdfBuffer,
        contentType: 'application/pdf',
      },
      transaction_id: order.billing_details.transaction_id, // If relevant
      payment_mode: paymentMode,
      total_amount: totalAmount,
      created_at: new Date(),
    };

    // Add the invoice to the order's invoices field
    order.invoices = newInvoice;

    // Save the updated order document
    await order.save();

    // Send Email with PDF attachment
    const mailSent = await sendMail({
      email: customerEmail,
      subject: 'Your Invoice',
      message: `Dear ${customerName}, please find attached your invoice.`,
      filename: 'invoice.pdf',
      pdfStream: pdfBuffer, // Pass Buffer here
    });

    logger.info(`Invoice sent to ${customerEmail}`, { customerName, pdfBuffer });

    // Send success response
    res.json({ message: 'Invoice sent and saved successfully!' });

  } catch (error) {
    console.error(error);
    // Ensure only one response is sent
    if (!res.headersSent) {
      res.status(500).json({ message: 'Failed to send invoice. Please try again later.' });
    }
  }
});
