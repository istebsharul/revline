import mongoose from 'mongoose';

const { Schema } = mongoose;

const communicationLogsSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    callSid: { type: String },
    fromNumber: { type: String, required: true },
    toNumber: { type: String, required: true },
    status: { type: String, required: true },
    duration: { type: Number },
    recordingUrl: { type: String },
    message: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const CommunicationLogs = mongoose.model('CommunicationLogs', communicationLogsSchema);

export default CommunicationLogs;
