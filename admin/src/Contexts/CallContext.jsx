import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';

// Create the context
const CallContext = createContext();

// Create a provider component
export const CallProvider = ({ children }) => {
  const [device, setDevice] = useState(null);
  const [incomingConnection, setIncomingConnection] = useState(null);
  const [currentConnection, setCurrentConnection] = useState(null);
  const [callInProgress, setCallInProgress] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callSid, setCallSid] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [callStatus, setCallStatus] = useState('Device is not ready');
  const isOutgoingRef = useRef(false);
  const [showCallPopup, setShowCallPopup] = useState(false);

  useEffect(() => {
    const loadTwilioSdk = () => {
      const script = document.createElement('script');
      script.src = 'https://media.twiliocdn.com/sdk/js/client/v1.13/twilio.min.js';
      script.async = true;
      script.onload = () => {
        console.log('Twilio SDK loaded');
        initDevice();
      };
      script.onerror = () => {
        console.error("Failed to load Twilio SDK. Retrying in 3 seconds...");
        setTimeout(loadTwilioSdk, 3000); // Retry loading SDK after 3 seconds
      };
      document.body.appendChild(script);
    };

    loadTwilioSdk();

    return () => {
      if (device) {
        device.destroy(); // Clean up the device when the component unmounts
      }
    };
  }, []);

  const getToken = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/twilio/token');
      return response.data.token;
    } catch (error) {
      console.error('Error fetching token:', error);
      return null;
    }
  };

  const initDevice = async () => {
    const token = await getToken();
    if (token) {
      const newDevice = new Twilio.Device(token, { debug: true });

      newDevice.on('ready', () => {
        console.log('Device ready');
        setCallStatus('Device ready');
      });

      newDevice.on('error', (error) => {
        console.error('Twilio device error:', error.message);
        setCallStatus('Error: ' + error.message);
      });

      newDevice.on('incoming', (connection) => {
        const callSid = connection.parameters.CallSid;  // Get the callSid for incoming calls
        console.log('Incoming callSid:', callSid);

        if (isOutgoingRef.current) {
          if(callInProgress){
            console.log(callInProgress);
            console.log("Call is in progress.");
            return;
          }
          // This is an outgoing call, so accept the connection automatically
          console.log('Outgoing Call Detected');
          connection.accept();
          setCurrentConnection(connection); // Store the active connection
          setCallStatus('Outgoing call accepted');
          setCallInProgress(true);
        } else {
          // Handle incoming call scenario
          console.log("Connecting as Incoming Call");
          setIncomingConnection(connection);
          setShowCallPopup(true);
          setCallStatus(`Incoming call... (Call SID: ${callSid})`);
          setCallSid(callSid);
        }
      });
      setDevice(newDevice);
    } else {
      console.error('Failed to initialize Twilio device');
      setCallStatus('Error initializing device');
    }
  };

  const handleMakeCall = async (number) => {
    const isPhoneNumberValid = phoneNumber && /^[0-9]{10,}$/.test(phoneNumber);

    if (!isPhoneNumberValid) {
      console.log("Please enter a valid phone number to continue.");
      setCallStatus("Invalid phone number");
      return;
    }
    console.log("Make Call Pressed");
    if (device) {
      isOutgoingRef.current = true;
      try {
        const response = await axios.post('http://localhost:3000/api/v1/twilio/call', { phoneNumber: number });
        setCallSid(response.data.callSid);
        setCallInProgress(true);
        setCallStatus('Calling...');
        setShowCallPopup(true);
      } catch (error) {
        console.error('Error making call', error.message);
        setCallStatus('Error making call');
      }
    }
  };

  const handleEndCall = async () => {
    if (callSid) {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/twilio/end-call', { callSid });
        console.log(response.data);
        setCallInProgress(false);
        setCallStatus('Call ended');
        setCallSid(null);
        setCurrentConnection(null);
        setShowCallPopup(false);
        isOutgoingRef.current=false;
      } catch (error) {
        console.error('Error ending call:', error);
        setCallStatus('Error ending call');
      }
    }
  };

  const acceptCall = () => {
    if (incomingConnection && !callInProgress) {
      console.log("Call Accepted!");
      incomingConnection.accept();
      setCallInProgress(true);
      setCurrentConnection(incomingConnection);
      setIncomingConnection(null);
      setCallStatus('Call in progress');
    }
  };

  const rejectCall = () => {
    if (incomingConnection) {
      incomingConnection.reject();
      setIncomingConnection(null);
      setCallStatus('Call rejected');
      setShowCallPopup(false);
    }
  };

  const muteCall = () => {
    if (currentConnection) {
      currentConnection.mute(true);
      setIsMuted(true);
      setCallStatus('Call muted');
    }
  };

  const resumeCall = () => {
    if (currentConnection) {
      currentConnection.mute(false);
      setIsMuted(false);
      setCallStatus('Call resumed');
    }
  };


  return (
    <CallContext.Provider value={{
      device,
      incomingConnection,
      currentConnection,
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
    }}>
      {children}
    </CallContext.Provider>
  );
};

// Custom hook for using the CallContext
export const useCallContext = () => {
  return useContext(CallContext);
};
