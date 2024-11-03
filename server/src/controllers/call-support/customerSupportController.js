// controllers/twilioController.js
import twilio from 'twilio';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import server from '../../index.js';
import logger from '../../utils/logger.js'; // Import logger
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

let io;
// Helper to handle response and errors
const sendTwimlResponse = (res, responseText) => {
  res.set('Content-Type', 'text/xml');
  res.send(`
    <Response>
        <Say>${responseText}</Say>
    </Response>
  `);
};

export const generateToken = (req, res) => {
  logger.info("Generating token for Twilio");
  try {
    const AccessToken = twilio.jwt.AccessToken;
    const VoiceGrant = AccessToken.VoiceGrant;

    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: process.env.TWILIO_APP_SID,
      incomingAllow: true,
    });

    const token = new AccessToken(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY,
      process.env.TWILIO_API_SECRET,
      { identity: 'web-user' }
    );
    token.addGrant(voiceGrant);

    res.json({ token: token.toJwt() });
    logger.info("Token generated successfully");
  } catch (error) {
    logger.error(`Error generating token: ${error.message}`);
    res.status(500).json({ error: 'Failed to generate token' });
  }
};

export const makeCall = async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    logger.warn("Phone number is missing in the request");
    return res.status(400).send('Phone number is required');
  }

  try {

    const call = await twilioClient.calls.create({
      url: `https://dc92-115-187-57-96.ngrok-free.app/api/v1/twilio/voice`, // URL to TwiML voice instructions
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number,
      statusCallback: `https://dc92-115-187-57-96.ngrok-free.app/api/v1/twilio/callback`,
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
    });

    logger.info(`Call started successfully, SID: ${call.sid}`);
    res.send({ message: 'Call started', callSid: call.sid }); // Send callSid in response
  } catch (error) {
    logger.error(`Error starting the call: ${error.message}`);
    res.status(500).json({ error: 'Failed to start call' });
  }
};

export const endCall = async (req, res) => {
  const { callSid } = req.body;

  if (!callSid) {
    logger.warn("Call SID is missing in the request");
    return res.status(400).send('Call SID is required');
  }

  try {
    await twilioClient.calls(callSid).update({ status: 'completed' });
    logger.info(`Call with SID ${callSid} has been ended.`);
    res.send(`Call with SID ${callSid} has been ended.`);
    // Disconnect the Socket.IO instance after ending the call
    // if (io) {
    //   io.close(); // Close all connections and clean up
    //   console.log("Socket.io server closed after call end.");
    //   io = null; // Reset the socket instance
    // }
  } catch (error) {
    logger.error(`Error ending the call: ${error.message}`);
    res.status(500).json({ error: 'Failed to end the call' });
  }
};

export const holdCall = async (req, res) => {
  const { callSid } = req.body;
  logger.info(callSid);
  try {
    const call = await twilioClient.calls(callSid).update({
      url: 'https://dc92-115-187-57-96.ngrok-free.app/api/v1/twilio/wait-music',
      method: 'POST'
    });

    res.status(200).json({ message: 'Call placed on hold', callStatus: call.status });
  } catch (error) {
    console.error('Error holding call:', error);
    res.status(500).json({ message: 'Failed to place call on hold', error: error.message });
  }
};

export const resumeCall = async (req, res) => {
  const { callSid } = req.body;
  logger.info(callSid);
  try {
    const call = await twilioClient.calls(callSid).update({
      url: 'https://dc92-115-187-57-96.ngrok-free.app/api/v1/twilio/resume-connection',
      method: 'POST'
    });

    res.status(200).json({ message: 'Call resumed', callStatus: call.status });
  } catch (error) {
    console.error('Error resuming call:', error);
    res.status(500).json({ message: 'Failed to resume call', error: error.message });
  }
};

export const holdMusicTwiml = (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.play('https://api.twilio.com/cowbell.mp3');  // URL to hold music

  res.type('text/xml');
  res.send(twiml.toString());
};

export const originalTwiml = (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('Resuming the call.');  // Add actual TwiML flow as needed
  twiml.dial().client('web-user');

  res.type('text/xml');
  res.send(twiml.toString());
};

export const voiceResponse = (req, res) => {
  logger.info("Generating TwiML voice response");
  try {
    // Initialize Socket.io if it hasn't been initialized yet
    if (!io) {
      io = new SocketIOServer(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      });

      // Handle Socket.io connections
      io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Handle custom events from clients
        socket.on('message', (data) => {
          console.log('Message received:', data);
          socket.emit('messageResponse', `Server received: ${data}`);
        });

        // Handle disconnection
        socket.on('disconnect', () => {
          console.log('User disconnected:', socket.id);
        });
      });
    }

    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say('You are connected to the web support agent.');
    twiml.dial().client('web-user');

    res.type('text/xml');
    res.send(twiml.toString());
    logger.info("TwiML voice response sent successfully");
  } catch (error) {
    logger.error(`Error generating TwiML response: ${error.message}`);
    res.status(500).json({ error: 'Failed to generate voice response' });
  }
};

export const fallBackVoice = (req, res) => {
  logger.warn('Primary TwiML failed. Fallback URL used.');
  sendTwimlResponse(res, 'Sorry! There is a network issue. Please contact us via Email or SMS.');
};

export const callBackVoice = async (req, res) => {
  const { MessageStatus, CallStatus, CallSid, Duration, To, From } = req.body;
  const status = MessageStatus || CallStatus;

  if (status) {
    try {
      logger.info(`Received call status update: ${status}, Call SID: ${CallSid}, To: ${To}, From: ${From} ${Duration}`);

      // Emit the status update to the frontend
      io.emit('callStatusUpdate', {
        status,
        CallSid,
        To,
        From,
        Duration
      });

      // if (status === 'completed' || status === 'no-answer') {
      //   io.close();
      //   console.log("IO closed since status", status);
      //   io = null;
      // }

      // Handle the status as before...
    } catch (error) {
      logger.error(`Error handling call status update: ${error.message}`);
    }
  } else {
    logger.warn("No status update received");
  }

  res.sendStatus(200); // Respond to Twilio with 200 OK
};

export const getCallLogs = async (req, res) => {
  try {
    const calls = await twilioClient.calls.list({ limit: 40 });
    logger.info('Fetched call logs successfully');
    res.status(200).json(calls);
  } catch (error) {
    logger.error(`Error fetching call logs: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch call logs' });
  }
};

export const sendSms = async (req, res) => {
  const { to, message } = req.body;

  try {
    const sms = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    logger.info(`SMS sent successfully, SID: ${sms.sid}`);
    res.status(200).json({ message: 'SMS sent!', sid: sms.sid });
  } catch (error) {
    logger.error(`Error sending SMS: ${error.message}`);
    res.status(500).json({ error: 'Failed to send SMS' });
  }
};

export const receiveSms = (req, res) => {
  const incomingMessage = req.body.Body;
  const fromNumber = req.body.From;

  logger.info(`Received message from ${fromNumber}: ${incomingMessage}`);

  sendTwimlResponse(res, 'Thank you for your message!');
};

export const getSmsLogs = async (req, res) => {
  try {
    const messages = await twilioClient.messages.list({ limit: 40 });
    logger.info('Fetched SMS logs successfully');
    res.status(200).json(messages);
  } catch (error) {
    logger.error(`Error fetching SMS logs: ${error.message}`);
    res.status(500).json({ error: 'Failed to fetch SMS logs' });
  }
};