import client from "../utils/twilioClient.js";
import logger from "../utils/logger.js";

export const endCall = async (req, res) => {
    const { callSid } = req.body;

    logger.info(`Received request to end call with SID: ${callSid}`);

    try {
        const call = await client.calls(callSid).update({ status: 'completed' });
        logger.info(`Call ended successfully with SID: ${callSid}`);
        res.status(200).json({ message: 'Call ended successfully!' });
    } catch (error) {
        logger.error(`Failed to end call with SID: ${callSid}. Error: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};
