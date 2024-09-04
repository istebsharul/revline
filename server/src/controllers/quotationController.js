import generatePdf from '../services/generatePdf.js';
import sendMail from '../utils/sendMail.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';

export const sendQuotation = asyncErrors(async (req, res) => {
  const customer = req.body;

  if (!customer) {
    return res.status(400).json({ message: 'Customer details are required.' });
  }

  if (!customer.email) {
    return res.status(400).json({ message: 'Customer email is required.' });
  }

  if (!customer.name) {
    return res.status(400).json({ message: 'Customer name is required.' });
  }

  if (!customer.vehicleData) {
    return res.status(400).json({ message: 'Vehicle data is required.' });
  }

  try {
    // Generate PDF using customer details
    const pdfStream = await generatePdf(customer);

    // Send Email with PDF attachment
    await sendMail({
      email: customer.email,
      subject: 'Your Quotation',
      message: 'Please find attached your quotation.',
      filename: 'quotation.pdf',
      pdfStream, // Pass Buffer here
    });

    res.json({ message: 'Quotation sent successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send quotation. Please try again later.' });
  }
});
