import CommunicationLogs from '../models/communicationLogsModel.js';
import asyncErrors from '../middlewares/catchAsyncErrors.js';

// Log Communication
export const logCommunication = asyncErrors(async (req, res) => {
    const { userId, callSid, fromNumber, toNumber, status, duration, recordingUrl, message } = req.body;

    const log = new CommunicationLogs({
        userId,
        callSid,
        fromNumber,
        toNumber,
        status,
        duration,
        recordingUrl,
        message
    });

    await log.save();

    res.status(201).json({ message: 'Communication log created', log });
});

// Get Communication Logs
export const getCommunicationLogs = asyncErrors(async (req, res) => {
    const { userId } = req.params;

    const logs = await CommunicationLogs.find({ userId });

    if (!logs || logs.length === 0) {
        return res.status(404).json({ message: 'No communication logs found for this user' });
    }

    res.status(200).json({ logs });
});
