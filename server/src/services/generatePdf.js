import PDFDocument from 'pdfkit';
import stream from 'stream';

const generatePdf = ({
  customer_name,
  customer_email,
  customer_phone,
  customer_address,
  customer_address1,
  quote_number,
  quote_date,
  order_summary,
  quoted_price,
  shipping_cost
}) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });
    const pdfStream = new stream.PassThrough();
    doc.pipe(pdfStream);

    // Set Background Color
    doc.rect(0, 0, doc.page.width, doc.page.height).fill('#f4ece5'); // Light gray background
    doc.fillColor('black'); // Reset text color to black

    // Header
    doc.fillColor('#5f5d5a').fontSize(30).font('Times-Roman').text('REVLINE AUTO PARTS', { align: 'right' });
    doc.fontSize(12).font('Helvetica').text('427 Crooked Stick Dr\nYerington, NV 89447, USA', { align: 'right' });
    doc.moveDown(1);

    // Title
    doc.fillColor('#5f5d5a').fontSize(55).font('Times-Roman').text('QUOTATION', { align: 'left' });
    doc.moveDown(0.4);

    // Customer Details and Quote Information
    doc.fontSize(14).font('Times-Italic').text('Quote To :', { align: 'left' });
    doc.moveDown(0.2);
    doc.fontSize(16).font('Times-Roman').text(customer_name, { align: 'left' });
    doc.moveDown(0.1);
    doc.fontSize(12).font('Times-Roman').text(
      `${customer_address}\n${customer_address1}\n${customer_phone}\n${customer_email}`,
      { align: 'left' }
    );
    doc.moveUp(4.5); // Move up for right-aligned text alignment.
    doc.fontSize(12).font('Helvetica-Bold').text(`Quote No : ${quote_number}`, { align: 'right' });
    doc.moveDown(0.5);
    doc.text(`Date : ${quote_date}`, { align: 'right' });
    doc.moveDown(4);

    // Table Headers
    const availableWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    const descriptionWidth = availableWidth * 0.4; // 40% width for DESCRIPTION
    const otherColumnsWidth = availableWidth * 0.2; // 20% width for QTY, PRICE, TOTAL

    // Set initial Y position for headers
    const headerY = doc.y;

    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('DESCRIPTION', doc.page.margins.left, headerY, { width: descriptionWidth, align: 'left' });
    doc.text('QTY', doc.page.margins.left + descriptionWidth, headerY, { width: otherColumnsWidth, align: 'center' });
    doc.text('PRICE', doc.page.margins.left + descriptionWidth + otherColumnsWidth, headerY, { width: otherColumnsWidth, align: 'center' });
    doc.text('TOTAL', doc.page.margins.left + descriptionWidth + 2 * otherColumnsWidth, headerY, { width: otherColumnsWidth, align: 'right' });

    doc.moveDown(0.5);
    doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke(); // Draw line under headers
    doc.moveDown(1);

    const summaryY = doc.y;

    // Order Summary Details
    if (order_summary && order_summary.part_name) {
      doc.fontSize(12).font('Helvetica');
      doc.text(order_summary.part_name, doc.page.margins.left, summaryY, { width: descriptionWidth, align: 'left' });
      doc.text(order_summary.quantity || 1, doc.page.margins.left + descriptionWidth, summaryY, { width: otherColumnsWidth, align: 'center' });
      doc.text(`$${(quoted_price-shipping_cost).toFixed(2)}`, doc.page.margins.left + descriptionWidth + otherColumnsWidth, summaryY, { width: otherColumnsWidth, align: 'center' });
      doc.text(`$${((quoted_price-shipping_cost) * (order_summary.quantity || 1)).toFixed(2)}`, doc.page.margins.left + descriptionWidth + 2 * otherColumnsWidth, summaryY, { width: otherColumnsWidth, align: 'right' });
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

    // Calculate parts price
    const partsPrice = quoted_price - shipping_cost;

    doc.text(`Parts Price:`, totalX - 80, subtotalY);
    doc.text(`$${partsPrice.toFixed(2)}`, totalX, subtotalY, { align: 'right' });
    doc.moveDown(0.2);
    doc.text(`Shipping:`, totalX - 80, subtotalY + 20);
    doc.text(`$${shipping_cost.toFixed(2)}`, totalX, subtotalY + 20, { align: 'right' });
    doc.moveDown(0.2);

    doc.moveDown(0.5);
    const lineWidth = availableWidth * 0.4;
    const startX = doc.page.width - doc.page.margins.right - lineWidth;
    doc.moveTo(startX, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
    doc.fontSize(12).font('Helvetica-Bold').text('TOTAL:', totalX - 80, subtotalY + 70);
    doc.text(`$${quoted_price.toFixed(2)}`, totalX, subtotalY + 70, { align: 'right' });
    doc.moveDown(1.5);

    // // Subtotals and Totals
    // const totalX = doc.page.width - doc.page.margins.right - 100;
    // const subtotalY = doc.y;
    // doc.fontSize(12).font('Helvetica');
    // doc.text(`Sub-total: $${quoted_price.toFixed(2)}`, totalX - 80, subtotalY);
    // doc.text(`$${quoted_price.toFixed(2)}`, totalX, subtotalY, { align: 'right' });
    // doc.moveDown(0.2);
    // doc.text(`Shipping: $${shipping_cost.toFixed(2)}`, totalX - 80, subtotalY + 20);
    // doc.text(`$${shipping_cost.toFixed(2)}`, totalX, subtotalY + 20, { align: 'right' });
    // doc.moveDown(0.2);
    // doc.text(`Sales Tax: $${salesTax.toFixed(2)}`, totalX - 80, subtotalY + 40);
    // doc.text(`$${salesTax.toFixed(2)}`, totalX, subtotalY + 40, { align: 'right' });
    // doc.moveDown(0.5);

    // const lineWidth = availableWidth * 0.4;
    // const startX = doc.page.width - doc.page.margins.right - lineWidth;
    // doc.moveTo(startX, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
    // doc.fontSize(12).font('Helvetica-Bold').text('TOTAL:', totalX - 80, subtotalY + 70);
    // doc.text(`$${totalAmount.toFixed(2)}`, totalX, subtotalY + 70, { align: 'right' });
    // doc.moveDown(1.5);

    // Terms and Conditions Section
    doc.rect(doc.page.margins.left, doc.y, availableWidth, 150).fill('#e4dbd7');
    doc.moveDown(1);
    doc.fillColor('black').fontSize(12).font('Helvetica-Bold').text('Terms and Conditions:', 80);
    doc.moveDown(0.5);
    doc.fillColor('#5f5d5a').fontSize(12).font('Helvetica').list(
      [
        'Payment: Due upon receipt. Accepted via credit card, PayPal, or bank transfer.',
        'Pricing: Subject to change. Stock availability may vary.',
        'Sales Tax: Applied based on shipping destination.',
        'Shipping: Estimated delivery times may vary.',
        'Returns: Defective parts returnable within 7 days, with prior authorization.',
        'Warranty: Used parts sold as-is, no warranty unless specified.',
        'Cancellations: Orders cannot be canceled once shipped.',
      ],
      {
        bulletRadius: 2,
        textIndent: 10,
        bulletIndent: 10,
        align: 'left',
        width: availableWidth,
        indent: 5,
      }
    );
    doc.moveDown(2);

    // Footer - Payment and Contact Information
    doc.rect(doc.page.margins.left, doc.y, availableWidth, 60).fill('#e4dbd7');
    const footerY = doc.y + 10;

    // Payment Information (Left Side)
    doc.fillColor('black').fontSize(12).font('Helvetica-Bold').text('Payment to :', doc.page.margins.left + 10, footerY, { align: 'left' });
    doc.fillColor('#5f5d5a').fontSize(12).font('Helvetica').text('Bank name: Cahaya Dewi\nBank code: 12345678999', { align: 'left' });

    // Contact Information (Right Side)
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

export default generatePdf;