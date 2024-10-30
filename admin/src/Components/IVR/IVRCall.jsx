import React, { useEffect } from 'react';
import DialPad from './Call/Dialpad';
import CallPopup from './Call/CallPopup';
import CallLogs from './CallLogs';
import { useCallContext } from '../../Contexts/CallContext';

const IVRCall = () => {
  const {
    incomingConnection,
    callInProgress,
    showCallPopup,
    phoneNumber,
    setPhoneNumber,
    callSid,
    isMuted,
    callStatus,
    handleMakeCall,
    handleEndCall,
    acceptCall,
    rejectCall,
    muteCall,
    resumeCall,
  } = useCallContext();

  const handleNumberChange = (phoneNumber) =>{
    console.log("HNC clicked!!");
    setPhoneNumber(phoneNumber);
  }

  useEffect(()=>{
    console.log(showCallPopup);
    console.log(callStatus);
  })

  return (
    <div className="flex flex-col items-center justify-center p-14 space-y-8">

      <DialPad
        phoneNumber={phoneNumber}
        handleNumberClick={(digit) => setPhoneNumber((prev) => prev + digit)}
        handleMakeCall={(e) => {
          e.preventDefault();
          handleMakeCall(phoneNumber);
        }}
        handleEndCall={handleEndCall}
        handleClearNumber={() => setPhoneNumber((prev) => prev.slice(0, -1))}
        handleNumberChange={handleNumberChange}
      />
      {showCallPopup && (
        <CallPopup
          type={incomingConnection ? 'incoming' : 'outgoing'}
          onEndCall={handleEndCall}
          incomingConnection={incomingConnection}
          acceptCall={acceptCall}
          rejectCall={rejectCall}
          isMuted={isMuted}
          handleMuteCall={muteCall}
          handleResumeCall={resumeCall}
        />
      )}
{/* 
      {incomingConnection && (
        <CallPopup
          type="incoming"
          onEndCall={handleEndCall}
          acceptCall={acceptCall}
          rejectCall={rejectCall}
          isMuted={false} // Update this based on your context state
          handleMuteCall={muteCall}
          handleResumeCall={resumeCall}
        />
      )} */}

      <CallLogs />
    </div>
  );
};

export default IVRCall;

// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import DialPad from './Call/Dialpad';
// import CallPopup from './Call/CallPopup';
// import CallLogs from './CallLogs';
// import CallStatusComponent from './CallStatusUpdate';

// const IVRCall = () => {
//   const [device, setDevice] = useState(null);
//   const [incomingConnection, setIncomingConnection] = useState(null);
//   const [currentConnection, setCurrentConnection] = useState(null);
//   const [callInProgress, setCallInProgress] = useState(null);
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [callSid, setCallSid] = useState(null);
//   const [isMuted, setIsMuted] = useState(null);
//   const [showCallPopup, setShowCallPopup] = useState(false);
//   const isOutgoingRef = useRef(false);
//   const [callStatus, setCallStatus] = useState('Device is not ready');
//   const [response, setResponse] = useState('');

//   // Add existing Twilio device handling and call logic here

//   useEffect(() => {
//     const loadTwilioSdk = () => {
//         const script = document.createElement('script');
//         script.src = 'https://media.twiliocdn.com/sdk/js/client/v1.13/twilio.min.js';
//         script.async = true;
//         script.onload = () => {
//             console.log('Twilio SDK loaded');
//             initDevice();
//         };
//         document.body.appendChild(script);
//     };

//     loadTwilioSdk();

//     return () => {
//         if (device) {
//             device.destroy(); // Clean up the device when the component unmounts
//         }
//     };
// }, []);

// const getToken = async () => {
//     try {
//         const response = await axios.get('http://localhost:3000/api/v1/twilio/token');
//         return response.data.token;
//     } catch (error) {
//         console.error('Error fetching token:', error);
//         return null;
//     }
// };

// const initDevice = async () => {
//     const token = await getToken();
//     if (token) {
//         const newDevice = new Twilio.Device(token, { debug: true });

//         newDevice.on('ready', () => {
//             console.log('Device ready');
//             setCallStatus('Device ready');
//         });

//         newDevice.on('error', (error) => {
//             console.error('Twilio device error:', error.message);
//             setCallStatus('Error: ' + error.message);
//         });

//         newDevice.on('incoming', (connection) => {
//             const callSid = connection.parameters.CallSid;  // Get the callSid for incoming calls
//             console.log('Incoming callSid:', callSid);

//             if (isOutgoingRef.current) {
//                 // This is an outgoing call, so accept the connection automatically
//                 console.log('Outgoing Call Detected');
//                 connection.accept();
//                 setCurrentConnection(connection); // Store the active connection
//                 setCallStatus('Outgoing call accepted');
//                 setCallInProgress(true);
//             } else {
//                 // Handle incoming call scenario
//                 setIncomingConnection(connection);
//                 setShowCallPopup(true);
//                 setCallStatus(`Incoming call... (Call SID: ${callSid})`);
//                 setCallSid(callSid);
//             }
//         });

//         setDevice(newDevice);
//     } else {
//         console.error('Failed to initialize Twilio device');
//         setCallStatus('Error initializing device');
//     }
// };

// const handleNumberClick = (digit) => {
//     setPhoneNumber((prev) => prev + digit);
// };

// const handleMakeCall = async (e) => {
//     e.preventDefault();
//     try {
//         if (device) {
//             isOutgoingRef.current = true;

//             const response = await axios.post('http://localhost:3000/api/v1/twilio/call', { phoneNumber });
//             console.log(response);

//             // Store the callSid from the response
//             setCallSid(response.data.callSid);
//             setCallInProgress(true);
//             setCallStatus('Calling...');
//             setResponse(response.data.message);
//             setShowCallPopup(true);
//         } else {
//             console.warn('Device not initialized');
//             setCallStatus('Device not ready');
//         }
//     } catch (error) {
//         console.error('Error making call', error.message);
//         setCallStatus('Error making call');
//     }
// };

// const handleNumberChange = (newNumber) => {
//     console.log("HNC clicked!!");
//     setPhoneNumber(newNumber);
// };

// const handleEndCall = async () => {
//     try {
//         if (callSid) {
//             const response = await axios.post('http://localhost:3000/api/v1/twilio/end-call', { callSid });
//             console.log(response.data);
//             setCallInProgress(false);
//             setCallStatus('Call ended');
//             setCallSid(null);
//             setCurrentConnection(null);
//             setResponse('Call ended successfully!');
//             setShowCallPopup(false);
//         } else {
//             console.warn('No active call to end');
//         }
//     } catch (error) {
//         console.error('Error ending call:', error);
//         setResponse(error.response?.data?.error || 'Failed to end call');
//         setCallStatus('Error ending call');
//     }
// };

// const handleClearNumber = () => {
//     setPhoneNumber((prev) => prev.slice(0, -1));
// };

// const acceptCall = () => {
//     if (incomingConnection) {
//         incomingConnection.accept();
//         setCallInProgress(true);
//         setCurrentConnection(incomingConnection);
//         setIncomingConnection(null);
//         setCallStatus('Call in progress');
//     }
// };

// const rejectCall = () => {
//     if (incomingConnection) {
//         incomingConnection.reject();
//         setIncomingConnection(null);
//         setCallStatus('Call rejected');
//     }
// };

// const muteCall = () => {
//     if (currentConnection) {
//         currentConnection.mute(true);
//         setIsMuted(true);
//         setCallStatus('Call muted');
//     }
// };

// const resumeCall = () => {
//     if (currentConnection) {
//         currentConnection.mute(false);
//         setIsMuted(false);
//         setCallStatus('Call resumed');
//     }
// };

//   return (
//     <div className="flex flex-col items-center justify-center p-14 space-y-8">
//       <CallStatusComponent />

//       <DialPad
//         phoneNumber={phoneNumber}
//         handleNumberClick={handleNumberClick}
//         handleMakeCall={handleMakeCall}
//         handleEndCall={handleEndCall}
//         handleClearNumber={handleClearNumber}
//         handleNumberChange={handleNumberChange}
//       />

//       {showCallPopup && (
//         <CallPopup
//           type={incomingConnection ? 'incoming' : 'outgoing'}
//           onEndCall={handleEndCall}
//           incomingConnection={incomingConnection}
//           acceptCall={acceptCall}
//           rejectCall={rejectCall}
//           isMuted={isMuted}
//           handleMuteCall={muteCall}
//           handleResumeCall={resumeCall}
//         />
//       )}

//       <CallLogs />
//     </div>
//   );
// };

// export default IVRCall;