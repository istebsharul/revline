import PDFDocument from 'pdfkit';
import stream from 'stream';

const generateInvoice = ({
  customer_name,
  customer_email,
  customer_phone,
  customer_address,
  customer_address1,
  zipcode,
  invoice_number,
  transaction_id,
  payment_mode,
  invoice_date,
  order_summary,
  quoted_price,
  shipping_cost,
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
    doc.fontSize(12).font('Helvetica').text('187 E. Warm Springs Rd. Suite B NV152 \n Las Vegas, NV 89119', { align: 'right' });
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
      `${customer_address}\n${customer_address1}\n${zipcode}\n${customer_phone}\n${customer_email}`,
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
    doc.text('DESCRIPTION', doc.page.margins.left, headerY, { width: descriptionWidth + 60, align: 'left' });
    doc.text('QTY', doc.page.margins.left + descriptionWidth + 60, headerY, { width: otherColumnsWidth, align: 'center' });
    doc.text('PRICE', doc.page.margins.left + descriptionWidth + otherColumnsWidth + 60, headerY, { width: otherColumnsWidth, align: 'center' });
    doc.text('TOTAL', doc.page.margins.left + descriptionWidth + 2 * otherColumnsWidth, headerY, { width: otherColumnsWidth, align: 'right' });

    doc.moveDown(0.5);
    doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
    doc.moveDown(1);

    const summaryY = doc.y;

    // Order Summary Details
    if (order_summary && order_summary.part_name) {
      doc.fontSize(12).font('Helvetica');
      doc.fontSize(10).text(`${order_summary?.year || ''} ${order_summary?.make || ''} ${order_summary?.model || ''} ${order_summary?.part_name || ''}`, doc.page.margins.left, summaryY, { width: descriptionWidth + 60, align: 'left' });
      doc.text(order_summary.quantity || 1, doc.page.margins.left + descriptionWidth + 60, summaryY+5, { width: otherColumnsWidth, align: 'center' });
      doc.text(`$${(quoted_price).toFixed(2)}`, doc.page.margins.left + descriptionWidth + otherColumnsWidth + 60, summaryY+5, { width: otherColumnsWidth, align: 'center' });
      doc.text(`$${((quoted_price) * (order_summary.quantity || 1)).toFixed(2)}`, doc.page.margins.left + descriptionWidth + 2 * otherColumnsWidth, summaryY+5, { width: otherColumnsWidth, align: 'right' });
    } else {
      doc.text('No order summary provided.', doc.page.margins.left);
    }
    doc.moveDown(2);
    doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
    doc.moveDown(1);

    // Subtotals and Totals
    const totalX = doc.page.width - doc.page.margins.right - 100;
    const subtotalY = doc.y;
    doc.fontSize(12).font('Helvetica');

    // Calculate parts price
    const partsPrice = quoted_price - shipping_cost;

    doc.text(`Sub Total:`, totalX - 80, subtotalY);
    doc.text(`$${quoted_price.toFixed(2)}`, totalX, subtotalY, { align: 'right' });
    doc.moveDown(0.2);

    doc.moveDown(0.5);
    const lineWidth = availableWidth * 0.4;
    const startX = doc.page.width - doc.page.margins.right - lineWidth;
    doc.moveTo(startX, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
    doc.fontSize(12).font('Helvetica-Bold').text('TOTAL:', totalX - 80, subtotalY + 50);
    doc.text(`$${quoted_price.toFixed(2)}`, totalX, subtotalY + 50, { align: 'right' });
    doc.moveDown(1.5);


    // Footer - Payment and Contact Information
    doc.rect(doc.page.margins.left, doc.y, availableWidth, 100).fill('#e4dbd7');
    const footerY = doc.y + 10;

    doc.fillColor('black').fontSize(12).font('Helvetica-Bold').text('Payment to :', doc.page.margins.left + 10, footerY, { align: 'left' });
    doc.fillColor('#5f5d5a')
      .fontSize(12)
      .font('Helvetica')
      .text('Beneficiary Name: Revline Auto Parts, LLC\nAccount Number: 202487384909\nABA Routing Number: 091311229\nType of Account: Checking\nBank Name: Choice Financial Group', { align: 'left' });

    doc.fillColor('black').fontSize(12).font('Helvetica-Bold').text('Contact Us :',doc.page.width - doc.page.margins.right - 200,footerY,{align: 'left'})
    doc.fillColor('#5f5d5a')
      .fontSize(12)
      .font('Helvetica').text(
        '+1 888 632 0709\nSupport@revlineautoparts.com\nrevlineautoparts.com',
      // doc.page.width - doc.page.margins.right - 200,
      // footerY,
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