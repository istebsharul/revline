import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPhone, FaBackspace } from 'react-icons/fa';
import { MdCallEnd } from 'react-icons/md';
import IncomingCall from '../CustomerManagement/IncomingCall';
import OutgoingCall from '../CustomerManagement/OutgoingCall';
import CallLogs from './CallLogs';


const IVRCall = () => {
    const [device, setDevice] = useState(null);
    const [incomingConnection, setIncomingConnection] = useState(null);
    const [currentConnection, setCurrentConnection] = useState(null);
    const [callInProgress, setCallInProgress] = useState(null);
    const [callStatus, setCallStatus] = useState('Device is not ready');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [callSid, setCallSid] = useState(null);
    const [isMuted, setIsMuted] = useState(null);
    const isOutgoingRef = useRef(false);
    const [response, setResponse] = useState('');
    const [showCallPopup, setShowCallPopup] = useState(false);
    const [callLogs, setCallLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        const loadTwilioSdk = () => {
            const script = document.createElement('script');
            script.src = 'https://media.twiliocdn.com/sdk/js/client/v1.13/twilio.min.js';
            script.async = true;
            script.onload = () => {
                console.log('Twilio SDK loaded');
                initDevice();
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
                    // This is an outgoing call, so accept the connection automatically
                    console.log('Outgoing Call Detected');
                    connection.accept();
                    setCurrentConnection(connection); // Store the active connection
                    setCallStatus('Outgoing call accepted');
                    setCallInProgress(true);
                } else {
                    // Handle incoming call scenario
                    setIncomingConnection(connection);
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

    // Function to handle keydown events
    const handleKeyDown = (e) => {
        const key = e.key;
        if (key >= '0' && key <= '9') {
            setPhoneNumber((prev) => prev + key);
        } else if (key === 'Backspace') {
            setPhoneNumber((prev) => prev.slice(0, -1));
        } else if (key === 'Enter') {
            handleMakeCall(e);
        }
    };

    useEffect(() => {
        // Add event listener for keydown events
        window.addEventListener('keydown', handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const handleNumberClick = (digit) => {
        setPhoneNumber((prev) => prev + digit);
    };

    const handleMakeCall = async (e) => {
        e.preventDefault();
        try {
            if (device) {
                isOutgoingRef.current = true;

                const response = await axios.post('http://localhost:3000/api/v1/twilio/call', { phoneNumber });
                console.log(response);

                // Store the callSid from the response
                setCallSid(response.data.callSid);
                setCallInProgress(true);
                setCallStatus('Calling...');
                setResponse(response.data.message);
                setShowCallPopup(true);
            } else {
                console.warn('Device not initialized');
                setCallStatus('Device not ready');
            }
        } catch (error) {
            console.error('Error making call', error.message);
            setCallStatus('Error making call');
        }
    };

    const handleEndCall = async () => {
        try {
            if (callSid) {
                const response = await axios.post('http://localhost:3000/api/v1/twilio/end-call', { callSid });
                console.log(response.data);
                setCallInProgress(false);
                setCallStatus('Call ended');
                setCallSid(null);
                setCurrentConnection(null);
                setResponse('Call ended successfully!');
                setShowCallPopup(false);
            } else {
                console.warn('No active call to end');
            }
        } catch (error) {
            console.error('Error ending call:', error);
            setResponse(error.response?.data?.error || 'Failed to end call');
            setCallStatus('Error ending call');
        }
    };

    const handleClearNumber = () => {
        setPhoneNumber('');
    };

    const acceptCall = () => {
        if (incomingConnection) {
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
        <div className="flex flex-col items-center justify-center p-8 space-y-8">
            {/* Dial Pad */}
            {response && (
                <div className="w-full flex justify-between max-w-md text-lg text-gray-400 bg-white text-center p-2 rounded-lg">
                    <h1 className='w-1/3 text-gray-500 text-bold'>Status :</h1>
                    <p className='w-2/3'>{response}</p>
                </div>
            )}
            <div className="w-full max-w-md bg-white shadow-md rounded-md p-4">
                <input
                    type="text"
                    value={phoneNumber}
                    readOnly
                    className="w-full text-center border-b-2 text-xl p-2 mb-4"
                />
                <div className="grid grid-cols-3 gap-4 mb-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, '*', 0, '#'].map((digit) => (
                        <button
                            key={digit}
                            onClick={() => handleNumberClick(digit)}
                            className="bg-gray-200 text-2xl p-4 rounded-full shadow-md hover:bg-gray-300"
                        >
                            {digit}
                        </button>
                    ))}
                </div>
                <div className="flex justify-around mb-4">
                    <button
                        onClick={handleMakeCall}
                        className="bg-green-500 p-4 rounded-full text-white"
                    >
                        <FaPhone />
                    </button>
                    <button
                        onClick={handleEndCall}
                        className="bg-red-500 p-4 rounded-full text-white"
                    >
                        <MdCallEnd />
                    </button>
                    <button
                        onClick={handleClearNumber}
                        className="bg-gray-300 p-4 rounded-full text-gray-700"
                    >
                        <FaBackspace />
                    </button>
                </div>
            </div>

            {incomingConnection && (
                <div>
                    <p>Incoming Call SID: {incomingConnection.parameters.CallSid}</p>
                    <IncomingCall
                        connection={incomingConnection}
                        onAccept={acceptCall}
                        onReject={rejectCall}
                    />
                </div>
            )}

            {callInProgress && !incomingConnection && (
                <div>
                    <OutgoingCall onEndCall={handleEndCall} />
                    {isMuted ? (
                        <button onClick={resumeCall}>Resume Call</button>
                    ) : (
                        <button onClick={muteCall}>Mute Call</button>
                    )}
                </div>
            )}

            {/* Call Popup */}
            {showCallPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md shadow-lg text-center">
                        <h2 className="text-lg font-bold">Calling {phoneNumber}...</h2>
                        <button
                            onClick={handleEndCall}
                            className="mt-4 bg-red-500 p-2 rounded-full text-white"
                        >
                            End Call
                        </button>
                    </div>
                </div>
            )}

            {/* Call Logs */}
            <CallLogs/>

        </div>
    );
};

export default IVRCall;
