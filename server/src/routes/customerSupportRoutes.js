// routes/twilioRoutes.js
import express from 'express';
import {
  generateToken,
  makeCall,
  endCall,
  getCallLogs,
  voiceResponse,
  fallBackVoice,
  callBackVoice,
  sendSms,
  receiveSms,
  getSmsLogs,
  holdCall,
  resumeCall,
  holdMusicTwiml,
  originalTwiml,
  aboutToConnect,
  queueStatus,
  handleDequeue
} from '../controllers/call-support/customerSupportController.js';

const router = express.Router();

// Token generation route
router.get('/token', generateToken);

// Call management routes
router.post('/call', makeCall);
router.post('/end-call', endCall);
router.get('/call-logs', getCallLogs);

// TwiML voice instructions
router.post('/voice', voiceResponse);

router.post('/hold-call', holdCall);
router.post('/resume-call',resumeCall);

router.post('/wait-music',holdMusicTwiml);
router.post('/resume-connection',originalTwiml)

router.post('/about-to-connect',aboutToConnect);

router.post('/queue-status', queueStatus);
router.post('/handle-deqeue', handleDequeue);

// Twiml Fallback 
router.post('/fallback',fallBackVoice);
// Twiml Callback
router.post('/callback',callBackVoice);

// Sms management routes
router.post('/sms-send', sendSms);
router.post('/sms-receive', receiveSms);
router.get('/sms-logs',getSmsLogs)

export default router;
