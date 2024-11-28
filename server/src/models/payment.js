import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    payment_id: { type: String, trim: true, unique: true },
    payer_id: { type: String, trim: true },
    transaction_id: { type: String, trim: true, unique: true,sparse:true},
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    payment_status: { type: String, default: 'Pending', trim: true },
    amount: { type: Number, required: true },
    currency: { type: String, trim: true },
    payment_method: { type: String, trim: true },
    description: { type: String, trim: true },
    payment_date: { type: Date, default: Date.now },
    invoice_number: { type: String, trim: true },
    token: { type: String, trim: true },
    refund: {
      refund_id: { type: String, trim: true },
      refund_amount: { type: Number },
      refund_date: { type: Date }
    }
  });
  
  const Payment = mongoose.model('Payment', PaymentSchema);
  export default Payment;
  