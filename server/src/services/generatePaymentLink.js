import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const clientId = process.env.PAYPAL_CLIENT_ID;
const secret = process.env.PAYPAL_SECRET;

// Function to get PayPal access token
const getAccessToken = async () => {
  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64');
  
  const response = await axios.post('https://api.sandbox.paypal.com/v1/oauth2/token', 'grant_type=client_credentials', {
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  return response.data.access_token;
};

// Function to create PayPal payment
const createPayPalPayment = async () => {
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
        return_url: 'https://your-site.com/return',
        cancel_url: 'https://your-site.com/cancel',
      },
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const approvalUrl = response.data.links.find(link => link.rel === 'approval_url').href;
    console.log('PayPal Payment URL:', approvalUrl);
  } catch (error) {
    console.error('Error creating PayPal payment:', error);
  }
};

createPayPalPayment();
