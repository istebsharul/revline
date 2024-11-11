import mongoose from "mongoose";

// Define a schema for the order summary without an automatic _id field
const OrderSummarySchema = new mongoose.Schema({
  part_code: { type: String, trim: true },
  year: { type: String, required: true, trim: true },
  make: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true },
  part_name: { type: String, required: true, trim: true },
  variant: { type: String, required: true, trim: true },
  transmission: { type: String, required: true, trim: true },
}, { _id: false });

const OrderDispositionHistorySchema = new mongoose.Schema({
  agent_notes: { type: String, trim: true },   // Store agent notes
  updated_at: { type: Date, default: Date.now },  // Timestamp for when the update occurred
},{_id:false});

// Schema for storing quotations
const QuotationSchema = new mongoose.Schema({
  status: { type: String, default: 'Pending', trim: true },
  quote_number: {type:String, unique:true, trim:true,sparse: true},
  message: {type:String,trim:true},
  created_at: { type: Date, default: Date.now }
});

const InvoiceSchema = new mongoose.Schema({
  status: {type: String, default: 'Pending', trim: true},
  invoice_number: {type: String, unique: true, trim: true,sparse:true},
  invoicePdf:{
    data:Buffer,
    contentType:{type: String, default: 'application/pdf'}
  },
  transaction_id: { type: String, trim: true },
  payment_mode: { type: String, trim: true }, 
  total_amount: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
})

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    // required: true,
  },
  request_date: { type: Date, default: Date.now },
  assignee: { type: String, trim: true },
  order_summary: OrderSummarySchema,  // Use the defined sub-schema
  pricing_details: {
    cost_price: { type: Number },
    shipping_size: { type: String, trim: true },
    shipping_cost: { type: Number, trim: true },
    shipping_speed: { type: String, trim: true, default:'Standard' },
    quoted_price: { type: Number, trim: true },
    surcharge: { type: Number, trim: true },
    gross_profit: { type: Number, trim: true },
  },
  shipping_details: {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer'
    },
    customer_name: { type: String, trim: true },
    customer_email: { type: String, trim: true },
    customer_phone: { type: String, trim: true },
    zipcode: { type: Number, trim: true },
    address_line_1: { type: String, trim: true },
    address_line_2: { type: String, trim: true },
    city: { type: String, trim: true },
    state_or_region: { type: String, trim: true },
    country_or_region: { type: String, trim: true, default: 'USA' },
    secondary_phone_number: { type: String, trim: true },
  },
  billing_details: {
    credit_card_type: { type: String, trim: true },
    card_holder_name: { type: String, trim: true },
    // Consider encrypting sensitive details
    credit_card_number: { type: String, trim: true }, 
    card_expiry_month: { type: String, trim: true },
    card_expiry_year: { type: String, trim: true },
    cvv: { type: String, trim: true }, // Consider hashing this
    billing_company_name: { type: String, trim: true },
    billing_address_line_1: { type: String, trim: true },
    billing_address_line_2: { type: String, trim: true },
    billing_city: { type: String, trim: true },
    billing_state_or_region: { type: String, trim: true },
    billing_zip_code: { type: String, trim: true },
    billing_country_or_region: { type: String, trim: true, default: 'USA' },
    transaction_id: {type: String, trim:true},
    transaction_method: {type: String, trim: true}
  },
  order_disposition_details: {
    specific_request_for_warehouse_team: { type: String, trim: true },
    agent_notes: { type: String, trim: true },
    order_status: { type: String, trim: true, default:'Pending Approval' },
  },
  disposition_history: { type: [OrderDispositionHistorySchema], default: [] },
  quotations: { type: QuotationSchema },  // New field for quotations
  invoices: {type: InvoiceSchema},
  payment_details: {type:mongoose.Schema.Types.ObjectId, ref: 'Payment'}
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
