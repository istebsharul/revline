import { Queue } from "bullmq";
import redis from "../config/redisConfig.js";
import logger from "../utils/logger.js";

export const followUpEmailQueue = new Queue("followUpEmailQueue", { connection: redis });

export const addFollowUpJob = async ({ orderId, quoteNumber, email, phone, followUpCount = 1 }) => {
  try {
    logger.info(`Adding Follow-Up ${followUpCount} for Order ID: ${orderId}, Quote No: ${quoteNumber}`);

    await followUpEmailQueue.add(
      `followUp-${orderId}-${followUpCount}`,
      { orderId, quoteNumber, email, phone, followUpCount },
      { delay: 60 * 1000 } // 2 min delay
    );

    logger.info(`Follow-Up ${followUpCount} scheduled for Order ID: ${orderId}`);
  } catch (error) {
    logger.error(`Failed to add follow-up job for Order ID: ${orderId}: ${error.message}`, { stack: error.stack });
  }
};
