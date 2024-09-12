import express from 'express';
import { sendQuotation } from '../controllers/quotationController.js';

const router = express.Router();

router.post('/send', sendQuotation);

export default router;
