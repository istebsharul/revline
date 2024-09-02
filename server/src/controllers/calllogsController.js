import twilioClient from '../utils/twilioClient.js';

export const getCallLogs = async (req, res) => {
    try {
        const calls = await twilioClient.calls.list({ limit: 20 });
        res.status(200).json(calls);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};