import { Queue } from "bullmq";
import redis from "../config/redisConfig.js";
import logger from "../utils/logger.js";

export const followUpEmailQueue = new Queue("followUpEmailQueue", { connection: redis });

export const addFollowUpJob = async ({ orderId, quoteNumber, name, email, phone, followUpCount}) => {
  try {
    logger.info(`Adding Follow-Up ${followUpCount} for Order ID: ${orderId}, Quote No: ${quoteNumber}`);

    let delay;
    if (followUpCount === 1) {
      delay = 2 * 24 * 60 * 60 * 1000; // 2 days
    } else if (followUpCount === 2) {
      delay = 3 * 24 * 60 * 60 * 1000; // 3 days
    } else if (followUpCount === 3) {
      delay = 5 * 24 * 60 * 60 * 1000; // 5 days
    } else {
      logger.warn(`Follow-Up ${followUpCount} is not scheduled as it's beyond the allowed limit.`);
      return;
    }

    await followUpEmailQueue.add(
      `followUp-${orderId}-${followUpCount}`,
      { orderId, quoteNumber, name, email, phone, followUpCount },
      { delay }
    );

    logger.info(`Follow-Up ${followUpCount} scheduled for Order ID: ${orderId}`);
  } catch (error) {
    logger.error(`Failed to add follow-up job for Order ID: ${orderId}: ${error.message}`, { stack: error.stack });
  }
};
