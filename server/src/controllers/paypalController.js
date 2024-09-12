import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import logger from '../utils/logger.js';

dotenv.config();

const clientId = process.env.PAYPAL_CLIENT_ID;
const secret = process.env.PAYPAL_CLIENT_SECRET;

// Initialize Express Router
const router = express.Router();

// Function to get PayPal access token
const getAccessToken = async () => {
    logger.info(clientId);
    logger.info(secret);
    const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');

    const response = await axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', 'grant_type=client_credentials', {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    return response.data.access_token;
};

// Route to create a PayPal payment
router.post('/create-payment', async (req, res) => {
    try {
        const accessToken = await getAccessToken();

        const response = await axios.post('https://api.sandbox.paypal.com/v1/payments/payment', {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            transactions: [
                {
                    amount: {
                        total: '10.00',
                        currency: 'USD',
                    },
                    description: 'Payment description',
                },
            ],
            redirect_urls: {
                return_url: 'http://localhost:3000/return',
                cancel_url: 'http://localhost:3000/cancel',
            },
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        const approvalUrl = response.data.links.find(link => link.rel === 'approval_url').href;
        res.json({ approvalUrl });
    } catch (error) {
        console.error('Error creating PayPal payment:', error);
        res.status(500).send('Error creating payment');
    }
});

// Route to handle PayPal return
router.get('/return', async (req, res) => {
    const paymentId = req.query.paymentId;
    const payerId = req.query.PayerID;

    try {
        const accessToken = await getAccessToken();

        const response = await axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, {
            payer_id: payerId,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        res.send('Payment successful');
    } catch (error) {
        console.error('Error executing PayPal payment:', error);
        res.status(500).send('Payment failed');
    }
});


// Example invoice data
const invoiceData = {
    "merchant_info": {
      "email": "merchant@example.com",
      "business_name": "Your Business",
      "phone": {
        "country_code": "US",
        "national_number": "4085552152"
      }
    },
    "billing_info": [{
      "email": "customer@example.com"
    }],
    "items": [{
      "name": "Item Name",
      "quantity": 1,
      "unit_price": {
        "currency": "USD",
        "value": "10.00"
      }
    }],
    "note": "Thank you for your business.",
    "terms": "No refunds after 30 days.",
    "payment_term": {
      "term_type": "NET_30"
    }
  };
  

// Function to create a PayPal invoice
const createPayPalInvoice = async (invoiceData) => {
    try {
      const accessToken = await getAccessToken();
      
      const response = await axios.post('https://api.sandbox.paypal.com/v2/invoicing/invoices', invoiceData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });
  
      return response.data;
    } catch (error) {
      logger.error('Error creating PayPal invoice:', error.response ? error.response.data : error.message);
      throw new Error('Failed to create invoice');
    }
  };
  
  // Route to create an invoice
  router.post('/create-invoice', async (req, res) => {
    try {
      const invoiceData = req.body; // Make sure to send the correct data structure in the request body
      const invoice = await createPayPalInvoice(invoiceData);
      res.json(invoice);
    } catch (error) {
      res.status(500).send('Error creating invoice');
    }
  });
  
  export default router;