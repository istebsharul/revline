import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import connectDatabase from "../config/db.js";
import { Worker } from "bullmq";
import redis from "../config/redisConfig.js";
import { sendMail } from "../utils/sendMail.js";
import Order from "../models/order.js";
import logger from "../utils/logger.js";
import { addFollowUpJob } from "./followUpEmailQueue.js";

await connectDatabase();

const followUpEmailWorker = new Worker(
  "followUpEmailQueue",
  async (job) => {
    logger.info(`Processing Follow-Up ${job.data.followUpCount} for Order ID: ${job.data.orderId}`);

    try {
      const { orderId, quoteNumber, email, phone, followUpCount } = job.data;

      if (mongoose.connection.readyState !== 1) {
        await connectDatabase();
      }

      const order = await Order.findById(orderId).lean();

      if (!order) {
        logger.warn(`Order not found - Job ID: ${job.id}, Order ID: ${orderId}`);
        return;
      }

      if (order.order_disposition_details.order_status !== "Awaiting Payment") {
        logger.info(`Skipping job: ${job.id} - Order ID: ${orderId} is not awaiting payment`);
        return;
      }

      const emailMessage = `Reminder for Quote No: ${quoteNumber}. Please complete payment.`;
      
      logger.info(`Sending email to ${email} for Quote No: ${quoteNumber},${followUpCount}`);
      await sendMail({ email, subject: `Payment Reminder: ${quoteNumber}`, message: emailMessage });
    
      if (followUpCount < 3) {
        logger.info("Hello");
        await addFollowUpJob({ orderId, quoteNumber, email, phone, followUpCount: followUpCount + 1 });
      } else {
        logger.info(`Final Follow-Up (3rd) sent for Order ID: ${orderId}. No further reminders.`);
      }

      logger.info(`Job ${job.id} completed successfully for Order ID: ${orderId}`);
    } catch (error) {
      logger.error(`Error processing job ${job.id}: ${error.message}`, { stack: error.stack });
    }
  },
  { connection: redis,removeOnComplete: { age: 10 } }
);

logger.info("Follow-up Email Worker initialized.");