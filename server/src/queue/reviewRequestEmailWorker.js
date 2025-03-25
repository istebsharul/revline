import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Worker } from "bullmq";
import connectDatabase from "../config/db.js";
import redis from "../config/redisConfig.js";
import logger from "../utils/logger.js";
import Order from "../models/order.js";
import { sendFeedbackRequestEmail } from "../utils/emailService.js";
import { sendSmsNotification } from "../utils/smsService.js";

// // Ensure database connection
await connectDatabase();

// ✅ Initialize Worker for Review Request Emails
const reviewRequestEmailWorker = new Worker(
  "reviewRequestEmailQueue",
  async (job) => {
    logger.info(`📬 Processing Review Request for Order ID: ${job.data.orderId}`);

    try {
      const { orderId, name, email, phone, orderDetails } = job.data;

      // Ensure DB is connected
      if (mongoose.connection.readyState !== 1) {
        await connectDatabase();
      }

      // Fetch order details
      const order = await Order.findById(orderId).select("order_disposition_details.order_status");

      if (!order) {
        logger.warn(`⚠️ Order not found - Job ID: ${job.id}, Order ID: ${orderId}`);
        return;
      }

      if(order.order_disposition_details.order_status !== "Delivered") {
        logger.warn(`⚠️ Order not delivered - Job ID: ${job.id}, Order ID: ${orderId}`);
        return;
      }

      if (!email) {
        logger.warn(`⚠️ No email found for Order ID: ${orderId}. Skipping.`);
        return;
      }

      await sendFeedbackRequestEmail({ email, name, feedbackLink: "https://g.page/r/CVl0S1321maCEBM/review", orderDetails });
      await sendSmsNotification({ type: "feedback_request", to: phone, data: { name, part_name:orderDetails.part_name } });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

      logger.info(`✅ Review Request Email Sent to: ${email} for Order ID: ${orderId}`);
    } catch (error) {
      logger.error(`❌ Error Processing Review Request: ${error.message}`, { stack: error.stack });
    }
  },
  { connection: redis, removeOnComplete: { age: 10 } }
);

logger.info("🚀 Review Request Email Worker Initialized.");
