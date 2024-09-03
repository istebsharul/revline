import client from '../utils/twilioClient.js';

export const getSmsLogs = async (req, res) => {
    try {
        const calls = await client.messages.list({ limit: 20 });
        res.status(200).json(calls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};