import PDFDocument from 'pdfkit';
import stream from 'stream';

const generatePdf = (customer) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const pdfStream = new stream.PassThrough();
    doc.pipe(pdfStream);

    // Title
    doc.fontSize(20).text('Quotation', { align: 'center' });
    doc.moveDown(1);

    // Customer Details
    doc.fontSize(14).text('Customer Details', { underline: true });
    doc.fontSize(12).moveDown(0.5);
    doc.text(`Name: ${customer.name}`);
    doc.text(`Email: ${customer.email}`);
    doc.moveDown(1);

    // Vehicle Data
    doc.fontSize(14).text('Vehicle Information', { underline: true });
    doc.fontSize(12).moveDown(0.5);
    const vehicleData = customer.vehicleData;
    if (vehicleData && vehicleData.length > 0) {
      vehicleData.forEach((vehicle) => {
        doc.text(`- Make: ${vehicle.make}`);
        doc.text(`  Model: ${vehicle.model}`);
        doc.text(`  Year: ${vehicle.year}`);
        doc.text(`  Variant: ${vehicle.variant}`);
        doc.text(`  Specification: ${vehicle.specification}`);
        doc.moveDown(0.5);
      });
    } else {
      doc.text('No vehicle data provided.');
    }
    doc.moveDown(1);

    // Amount
    doc.fontSize(14).text('Quotation Amount', { underline: true });
    doc.fontSize(12).moveDown(0.5);
    doc.text(`Total Amount: $${customer.amount}`);
    doc.moveDown(1);

    // Footer
    doc.fontSize(10).text('Thank you for considering our services. If you have any questions, please contact us.', { align: 'center' });

    doc.end();

    // Collect the PDF data as a Buffer
    let chunks = [];
    pdfStream.on('data', (chunk) => chunks.push(chunk));
    pdfStream.on('end', () => resolve(Buffer.concat(chunks)));
    pdfStream.on('error', reject);
  });
};

export default generatePdf;
