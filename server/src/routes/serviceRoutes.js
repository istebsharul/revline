import express from 'express';
import { rejectQuotation, sendQuotation } from '../controllers/service/quotationController.js';
import { sendInvoice } from '../controllers/service/invoiceController.js';

const router = express.Router();

router.post('/quotation/send', sendQuotation);
router.put('/quotation/reject/:orderId',rejectQuotation);
router.post('/invoice/send',sendInvoice);

export default router;
