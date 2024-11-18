// routes/smsRoutes.js
import express from 'express';
import { makeCall, receiveCall } from '../controllers/callController.js';
import { sendSms, receiveSms } from '../controllers/smsController.js';
import { getCallLogs } from '../controllers/calllogsController.js';
import { endCall } from '../controllers/endCallController.js';
import {getSmsLogs} from '../controllers/smsLogsController.js'

const router = express.Router();

router.post('/send-sms', sendSms);
router.post('/sms-receive', receiveSms);
router.get('/sms-logs',getSmsLogs)
router.post('/make-call', makeCall);
router.post('/end-call',endCall);
router.post('/voice-receive', receiveCall);
router.get('/call-logs', getCallLogs);



export default router;