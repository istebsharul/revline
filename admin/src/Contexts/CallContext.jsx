import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// Create the context
const CallContext = createContext();

// Create a provider component
export const CallProvider = ({ children }) => {
	const [device, setDevice] = useState(null);
	const [incomingConnection, setIncomingConnection] = useState(null);
	const [outgoingConnection, setOutgoingConnection] = useState(null);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [callSid, setCallSid] = useState('');
	const [incomingCallSid, setIncomingCallSid] = useState('');
	const [waitingConnection, setWaitingConnection] = useState(null);
	const [isMuted, setIsMuted] = useState(false);
	const [callStatus, setCallStatus] = useState('');
	const [deviceStatus, setDeviceStatus] = useState('Device is not ready');
	const isOutgoingRef = useRef(false);
	const isCallOngoing = useRef(false);
	const [showCallPopup, setShowCallPopup] = useState(false);
	const [queueStatus, setQueueStatus] = useState([]);

	useEffect(() => {
		// Listen for call status updates
		socket.on('callStatusUpdate', (data) => {
			setCallStatus(data.status);
			if (data.status === 'busy' || data.status === 'completed' || data.status === 'no-answer') {
				// handleEndCall(); // End the call by calling handleEndCall
				setCallStatus('Call ended', data.status);
				setCallSid('');
				setIncomingCallSid('');
				setTimeout(() => {
					setShowCallPopup(false);
				}, 2000);
				isOutgoingRef.current = false;
				isCallOngoing.current = false;
			}
		});

		// Cleanup on unmount
		return () => {
			socket.off('callStatusUpdate');
			console.log("socket off....");
		};
	}, []);
	
	
	useEffect(()=>{
		// socket.on('queue-status-update',(data)=>{
		// 	console.log(data);
		// })
		// return(()=>{
		// 	socket.off('queue-status-update');
		// 	console.log("Queue Status socket off...");
		// })
		const fetchQueueStatus = async() =>{
			try {
				const response = await axios.post('http://localhost:3000/api/v1/twilio/queue-status');
				setQueueStatus(response.data);
				console.log("Queuee.........................",response);
			} catch (error) {
				console.error(error.message); 
			}
		}
		fetchQueueStatus();
	},[]);

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
				setDeviceStatus('Device ready');
			});

			newDevice.on('error', (error) => {
				console.error('Twilio device error:', error.message);
				setDeviceStatus('Error: ' + error.message);
			});


			newDevice.on('incoming', (connection) => {
				const incomingCallSid = connection.parameters.CallSid;  // Get the callSid for incoming calls

				console.log("New Connection", connection);

				console.log("Before Call SID:", callSid);

				connection.on('reject', () => {
					console.log('The Call was rejected');
				})

				if (isCallOngoing.current) {
					// connection.reject();
					setWaitingConnection(connection);
					// Check if connection is valid before muting
					if (waitingConnection) {
						console.log("Waiting Connection", waitingConnection);
					} else {
						console.log("Now waiting Call Found");
					}
					console.log(isOutgoingRef.current);
					console.log("Someone is trying to make a call");
					return;
				} else {
					console.log("No Call ongoing!");
				}

				if (isOutgoingRef.current) {
					// This is an outgoing call, so accept the connection automatically
					console.log('Outgoing Call Detected');
					connection.accept();
					isCallOngoing.current = true;
					setOutgoingConnection(connection);
					setCallStatus('Outgoing call accepted');
				} else {
					// Handle incoming call scenario
					console.log("Connecting as Incoming Call");
					setIncomingConnection(connection);
					setShowCallPopup(true);
					setCallStatus(`Incoming Call SID: ${incomingCallSid}`);
					setIncomingCallSid(incomingCallSid);
				}
				console.log("After Call SID:", callSid);
			});
			setDevice(newDevice);
		} else {
			console.error('Failed to initialize Twilio device');
			setDeviceStatus('Error initializing device');
		}
	};

	const handleWaitingConnection = async () => {
		try {
			const res = await axios.post('http://localhost:3000/api/v1/twilio/handle-deqeue');
			console.log('Connecting to an agent',res);
		} catch (error) {
			console.error(error);
		}
	}

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
				console.log(response.data);
				setCallSid(response.data.callSid);
				console.log(callSid);
				setCallStatus('Calling...');
				setShowCallPopup(true);
			} catch (error) {
				console.error('Error making call', error.message);
				setCallStatus('Error making call');
			}
		}
	};

	const handleEndCall = async () => {
		const activeCallSid = incomingCallSid || callSid;
		if (activeCallSid) {
			try {
				const response = await axios.post('http://localhost:3000/api/v1/twilio/end-call', { callSid: activeCallSid });
				console.log(response.data);
				setCallStatus('Call ended');
				setCallSid('');
				setIncomingCallSid('');
				setShowCallPopup(false);
				isOutgoingRef.current = false;
				isCallOngoing.current = false;
			} catch (error) {
				console.error('Error ending call:', error);
				setCallStatus('Error ending call');
			}
		} else {
			console.log("No active Call Sid");
			setShowCallPopup(false);
		}
		setIsMuted(false);
	};

	const acceptCall = () => {
		if (incomingConnection) {
			console.log(incomingConnection);
			console.log("Call Accepted!");
			incomingConnection.accept();
			isCallOngoing.current = true;
			setIncomingConnection(null);
			setCallStatus('Call Accepted');
		} else {
			console.log('No Connection found to accept.');
		}
	};

	const rejectCall = () => {
		if (incomingConnection) {
			incomingConnection.reject();
			setIncomingConnection(null);
			setCallStatus('Call Rejected');
			setShowCallPopup(false);
			isCallOngoing.current = false;
		} else {
			console.log('No Connect found to reject.')
		}
	};

	const muteCall = async () => {
		const activeCallSid = isOutgoingRef.current ? callSid : incomingCallSid;
		console.log(activeCallSid);
		if(activeCallSid === ''){
			console.log("Call not found!");
			return;
		}
		try {
			const response = await axios.post('http://localhost:3000/api/v1/twilio/hold-call', {
				callSid:activeCallSid,
			});

			if (response.status === 200) {
				console.log('Mute successful:', response.data.message);
				setIsMuted(true);
				isCallOngoing.current = false;
				console.log("Call Ongoing Status",isCallOngoing.current)
			} else {
				console.error('Failed to mute call');
			}
		} catch (error) {
			console.error('Error muting call:', error.message);
		}
	};

	const resumeCall = async () => {
		const activeCallSid = isOutgoingRef.current ? callSid: incomingCallSid;
		console.log(activeCallSid);
		try {
			const response = await axios.post('http://localhost:3000/api/v1/twilio/resume-call', {
				callSid:activeCallSid,
			});

			if (response.status === 200) {
				console.log('Resume successful:', response.data.message);
				setIsMuted(false);
				console.log(isCallOngoing.current);
			} else {
				console.error('Failed to resume call');
			}
		} catch (error) {
			console.error('Error resuming call:', error.message);
		}
	};

	return (
		<CallContext.Provider value={{
			deviceStatus,
			incomingConnection,
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
			waitingConnection,
			handleWaitingConnection,
			queueStatus
		}}>
			{children}
		</CallContext.Provider>
	);
};

// Custom hook for using the CallContext
export const useCallContext = () => {
	return useContext(CallContext);
};
