import generatePdf from '../services/generatePdf.js';
import sendMail from '../utils/sendMail.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';
import Customer from '../models/customerSchema.js';

export const sendQuotation = asyncErrors(async (req, res) => {
  const { customerId } = req.body;
  console.log(req.body);

  console.log(customerId);

  if (!customerId) {
    return res.status(400).json({ message: 'Customer ID is required.' });
  }

  // Fetch the customer from the database
  const customer = await Customer.findById(customerId);

  if (!customer) {
    return res.status(404).json({ message: 'Customer not found.' });
  }

  if (!customer.email) {
    return res.status(400).json({ message: 'Customer email is required.' });
  }

  if (!customer.name) {
    return res.status(400).json({ message: 'Customer name is required.' });
  }

  if (!customer.vehicleData || customer.vehicleData.length === 0) {
    return res.status(400).json({ message: 'Vehicle data is required.' });
  }

  try {
    // Generate PDF using customer details
    const pdfBuffer = await generatePdf(customer); // Assume generatePdf returns a Buffer

    // Create a new quotation entry
    const newQuotation = {
      status: 'Pending',
      quotationPdf: {
        data: pdfBuffer,
        contentType: 'application/pdf',
      },
    };

    // Add the new quotation to the customer's quotations array
    customer.quotations=newQuotation;

    // Save the updated customer document
    await customer.save();

    // Send Email with PDF attachment
    await sendMail({
      email: customer.email,
      subject: 'Your Quotation',
      message: 'Please find attached your quotation.',
      filename: 'quotation.pdf',
      pdfStream: pdfBuffer, // Pass Buffer here
    });

    res.json({ message: 'Quotation sent and saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send quotation. Please try again later.' });
  }
});
