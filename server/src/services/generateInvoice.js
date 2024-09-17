import PDFDocument from 'pdfkit';
import stream from 'stream';

const generateInvoice = ({
  customer_name,
  customer_email,
  customer_phone,
  customer_address,
  customer_address1,
  invoice_number,
  transaction_id,
  payment_mode,
  invoice_date,
  order_summary,
  quoted_price,
  shipping_cost,
  salesTax,
  totalAmount,
}) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });
    const pdfStream = new stream.PassThrough();
    doc.pipe(pdfStream);

    // Set Background Color
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f4ece5');
    doc.fillColor('black');

    // Header
    doc.fillColor('#5f5d5a').fontSize(30).font('Times-Roman').text('REVLINE AUTO PARTS', { align: 'right' });
    doc.fontSize(12).font('Helvetica').text('427 Crooked Stick Dr\nYerington, NV 89447, USA', { align: 'right' });
    doc.moveDown(1);

    // Title
    doc.fillColor('#5f5d5a').fontSize(55).font('Times-Roman').text('INVOICE', { align: 'left' });
    doc.moveDown(0.4);

    // Customer and Invoice Details
    doc.fontSize(14).font('Times-Italic').text('Invoice To :', { align: 'left' });
    doc.moveDown(0.2);
    doc.fontSize(16).font('Times-Roman').text(customer_name, { align: 'left' });
    doc.moveDown(0.1);
    doc.fontSize(12).font('Times-Roman').text(
      `${customer_address}\n${customer_address1}\n${customer_phone}\n${customer_email}`,
      { align: 'left' }
    );
    doc.moveUp(4.5); 
    doc.fontSize(12).font('Helvetica-Bold').text(`Invoice No : ${invoice_number}`, { align: 'right' });
    doc.moveDown(0.5);
    doc.text(`Transaction ID : ${transaction_id}`, { align: 'right' });
    doc.moveDown(0.5);
    doc.text(`Payment Mode : ${payment_mode}`, { align: 'right' });
    doc.moveDown(0.5);
    doc.text(`Date : ${invoice_date}`, { align: 'right' });
    doc.moveDown(4);

    // Table Headers
    const availableWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const descriptionWidth = availableWidth * 0.4;
    const otherColumnsWidth = availableWidth * 0.2;

    const headerY = doc.y;

    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('DESCRIPTION', doc.page.margins.left, headerY, { width: descriptionWidth, align: 'left' });
    doc.text('QTY', doc.page.margins.left + descriptionWidth, headerY, { width: otherColumnsWidth, align: 'center' });
    doc.text('PRICE', doc.page.margins.left + descriptionWidth + otherColumnsWidth, headerY, { width: otherColumnsWidth, align: 'center' });
    doc.text('TOTAL', doc.page.margins.left + descriptionWidth + 2 * otherColumnsWidth, headerY, { width: otherColumnsWidth, align: 'right' });

    doc.moveDown(0.5);
    doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke(); 
    doc.moveDown(1);

    const summaryY = doc.y;

    // Order Summary Details
    if (order_summary && order_summary.part_name) {
      doc.fontSize(12).font('Helvetica');
      doc.text(order_summary.part_name, doc.page.margins.left, summaryY, { width: descriptionWidth, align: 'left' });
      doc.text(order_summary.quantity || 1, doc.page.margins.left + descriptionWidth, summaryY, { width: otherColumnsWidth, align: 'center' });
      doc.text(`$${(order_summary.price || quoted_price).toFixed(2)}`, doc.page.margins.left + descriptionWidth + otherColumnsWidth, summaryY, { width: otherColumnsWidth, align: 'center' });
      doc.text(`$${((order_summary.price || quoted_price) * (order_summary.quantity || 1)).toFixed(2)}`, doc.page.margins.left + descriptionWidth + 2 * otherColumnsWidth, summaryY, { width: otherColumnsWidth, align: 'right' });
    } else {
      doc.text('No order summary provided.', doc.page.margins.left);
    }
    doc.moveDown(1);
    doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
    doc.moveDown(1);

    // Subtotals and Totals
    const totalX = doc.page.width - doc.page.margins.right - 100;
    const subtotalY = doc.y;
    doc.fontSize(12).font('Helvetica');
    doc.text(`Sub-total: $${quoted_price.toFixed(2)}`, totalX - 80, subtotalY);
    doc.text(`$${quoted_price.toFixed(2)}`, totalX, subtotalY, { align: 'right' });
    doc.moveDown(0.2);
    doc.text(`Shipping: $${shipping_cost.toFixed(2)}`, totalX - 80, subtotalY + 20);
    doc.text(`$${shipping_cost.toFixed(2)}`, totalX, subtotalY + 20, { align: 'right' });
    doc.moveDown(0.2);
    doc.text(`Sales Tax: $${salesTax.toFixed(2)}`, totalX - 80, subtotalY + 40);
    doc.text(`$${salesTax.toFixed(2)}`, totalX, subtotalY + 40, { align: 'right' });
    doc.moveDown(0.5);

    const lineWidth = availableWidth * 0.4;
    const startX = doc.page.width - doc.page.margins.right - lineWidth;
    doc.moveTo(startX, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
    doc.fontSize(12).font('Helvetica-Bold').text('TOTAL:', totalX - 80, subtotalY + 70);
    doc.text(`$${totalAmount.toFixed(2)}`, totalX, subtotalY + 70, { align: 'right' });
    doc.moveDown(1.5);

    // Footer - Payment and Contact Information
    doc.rect(doc.page.margins.left, doc.y, availableWidth, 60).fill('#e4dbd7');
    const footerY = doc.y + 10;

    doc.fillColor('black').fontSize(12).font('Helvetica-Bold').text('Payment to :', doc.page.margins.left + 10, footerY, { align: 'left' });
    doc.fillColor('#5f5d5a').fontSize(12).font('Helvetica').text('Bank name: Cahaya Dewi\nBank code: 12345678999', { align: 'left' });

    doc.fillColor('black').fontSize(12).font('Helvetica').text(
      '+123-456-789\nSupport@revlineautoparts.com\nrevlineautoparts.com',
      doc.page.width - doc.page.margins.right - 200,
      footerY,
      { align: 'left' }
    );

    doc.end();

    // Collect the PDF data as a Buffer
    let chunks = [];
    pdfStream.on('data', (chunk) => chunks.push(chunk));
    pdfStream.on('end', () => resolve(Buffer.concat(chunks)));
    pdfStream.on('error', reject);
  });
};

export default generateInvoice;
