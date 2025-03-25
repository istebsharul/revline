import {Queue, tryCatch} from "bullmq";
import redis from "../config/redisConfig.js";
import logger from "../utils/logger.js";

export const reviewRequestEmailQueue = new Queue("reviewRequestEmailQueue", {connection: redis});

export const addReviewRequestJob = async ({orderId,name,email,phone,orderDetails}) => {
    logger.info("Order ID",orderId);
    logger.info("Name",name);
    logger.info("Email",email);
    logger.info("Phone",phone);
    logger.info("Order Details",orderDetails);

    try {
        logger.info(`Adding Review Request for Order ID: ${orderId}`);
        await reviewRequestEmailQueue.add(
            `reviewRequest-${orderId}`,
            {orderId,name,email,phone,orderDetails},
            {delay: 30 * 24 * 60 * 60 * 1000} // 30 day delay
        );
        logger.info(`Review Request scheduled for Order ID: ${orderId}`);   
    } catch (error) {
        logger.error(`Failed to add review request job for Order ID: ${orderId}: ${error.message}`, {stack: error.stack});
    }
}