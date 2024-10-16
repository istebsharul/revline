// controllers/twilioController.js
import twilio from 'twilio';
import dotenv from 'dotenv';
import logger from '../../utils/logger.js'; // Import logger
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

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
      url: `https://9ae2-115-187-57-104.ngrok-free.app/api/v1/twilio/voice`, // URL to TwiML voice instructions
      to: phoneNumber,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
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
  } catch (error) {
    logger.error(`Error ending the call: ${error.message}`);
    res.status(500).json({ error: 'Failed to end the call' });
  }
};

export const voiceResponse = (req, res) => {
  logger.info("Generating TwiML voice response");
  try {
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

export const callBackVoice = (req, res) => {
  const { MessageStatus, CallStatus } = req.body;
  const status = MessageStatus || CallStatus;
  
  if (status) {
    logger.info(`Received status update: ${status}`);
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

// // controllers/twilioController.js
// import twilio from 'twilio';
// import dotenv from 'dotenv';
// import logger from '../../utils/logger.js';  // Import logger
// dotenv.config();

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const twilioClient = twilio(accountSid, authToken);

// export const generateToken = (req, res) => {
//   logger.info("Generating token for Twilio");  // Logging

//   const AccessToken = twilio.jwt.AccessToken;
//   const VoiceGrant = AccessToken.VoiceGrant;

//   const voiceGrant = new VoiceGrant({
//     outgoingApplicationSid: process.env.TWILIO_APP_SID,
//     incomingAllow: true,
//   });

//   const token = new AccessToken(
//     process.env.TWILIO_ACCOUNT_SID,
//     process.env.TWILIO_API_KEY,
//     process.env.TWILIO_API_SECRET,
//     { identity: 'web-user' }
//   );
//   token.addGrant(voiceGrant);

//   res.json({ token: token.toJwt() });
//   logger.info("Token generated successfully");
// };

// export const makeCall = (req, res) => {
//   const { phoneNumber } = req.body;

//   if (!phoneNumber) {
//     logger.warn("Phone number is missing in the request");
//     return res.status(400).send('Phone number is required');
//   }

//   twilioClient.calls
//     .create({
//       url: 'https://fe05-115-187-57-65.ngrok-free.app/api/v1/twilio/voice', // URL to TwiML voice instructions
//       to: phoneNumber,
//       from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
//     })
//     .then((call) => {
//       logger.info(`Call started successfully, SID: ${call.sid}`);
//       res.send({ message: 'Call started', callSid: call.sid }); // Send callSid in response
//     })
//     .catch((err) => {
//       logger.error(`Error starting the call: ${err.message}`);
//       res.status(500).send(err);
//     });
// };

// export const endCall = (req, res) => {
//   const { callSid } = req.body;

//   if (!callSid) {
//     logger.warn("Call SID is missing in the request");
//     return res.status(400).send('Call SID is required');
//   }

//   twilioClient.calls(callSid)
//     .update({ status: 'completed' })
//     .then(call => {
//       logger.info(`Call with SID ${callSid} has been ended.`);
//       res.send(`Call with SID ${callSid} has been ended.`);
//     })
//     .catch(err => {
//       logger.error(`Error ending the call: ${err.message}`);
//       res.status(500).send(err);
//     });
// };

// export const voiceResponse = (req, res) => {
//   logger.info("Generating TwiML voice response");
//   const twiml = new twilio.twiml.VoiceResponse();
//   twiml.say('You are connected to the web support agent.');
//   twiml.dial().client('web-user');

//   res.type('text/xml');
//   res.send(twiml.toString());

//   logger.info("TwiML voice response sent successfully");
// };

// // Fallback URL in case the primary URL fails
// export const fallBackVoice = (req, res) => {
//   console.log('Primary TwiML failed. Fallback URL used.');

//   res.set('Content-Type', 'text/xml');
//   res.send(`
//       <Response>
//           <Say>Sorry! there is a network issue please contact us via Email or SMS.</Say>
//       </Response>
//   `);
// };

// // Status Callback URL to receive updates on the status of a call or message
// export const callBackVoice = (req, res) => {
//   const { MessageStatus, CallStatus } = req.body; // For SMS or Call status
//   console.log(`Received status update: ${MessageStatus || CallStatus}`);

//   // Log the message or call status
//   if (MessageStatus) {
//     console.log(`Message status: ${MessageStatus}`);
//   } else if (CallStatus) {
//     console.log(`Call status: ${CallStatus}`);
//   }

//   // Respond to Twilio with a 200 OK
//   res.sendStatus(200);
// };

// // Call logs
// export const getCallLogs = async (req, res) => {
//   try {
//       const calls = await twilioClient.calls.list({ limit: 20 });
//       res.status(200).json(calls);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// };

// // Send SMS
// export const sendSms = (req, res) => {
//   const { to, message } = req.body;

//   twilioClient.messages.create({
//       body: message,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to,
//   })
//   .then(message => res.status(200).json({ message: 'SMS sent!', sid: message.sid }))
//   .catch(error => res.status(500).json({ error: error.message }));
// };

// // Receive SMS
// export const receiveSms = (req, res) => {
//   const incomingMessage = req.body.Body;
//   const fromNumber = req.body.From;

//   console.log(`Received message: ${incomingMessage} from ${fromNumber}`);

//   res.send(`
//       <Response>
//           <Message>Thank you for your message!</Message>
//       </Response>
//   `);
// };

// // Sms Logs
// export const getSmsLogs = async (req, res) => {
//   try {
//       const calls = await client.messages.list({ limit: 20 });
//       res.status(200).json(calls);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// };
