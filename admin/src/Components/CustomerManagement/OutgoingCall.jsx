import React, { useEffect, useState } from 'react';
import { FiMicOff } from "react-icons/fi";
import { FiMic } from "react-icons/fi";

const OutgoingCall = ({ onEndCall, handleResumeCall, handleMuteCall, isMuted }) => {
  const [callTimer, setCallTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  useEffect(() => {
    setCallTimer(0);
    const interval = setInterval(() => {
      setCallTimer((prev) => prev + 1);
    }, 1000);
    setTimerInterval(interval);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="outgoing-call w-40 flex flex-col justify-center items-center">
      <p>Timer: {formatTime(callTimer)}</p>
      <div className='flex flex-col justify-center items-center p-2 space-y-2'>
        {isMuted ? (
          <button className='px-2 py-1 bg-green-500 text-white rounded text-sm' onClick={handleResumeCall}>Resume</button>
        ) : (
          <button className='px-3 py-1 bg-blue-500 text-white rounded text-sm' onClick={handleMuteCall}>Hold</button>
        )}
        <button className='bg-red-500 text-white px-2 py-1 rounded-lg' onClick={onEndCall}>End Call</button>
      </div>
    </div>
  );
};

export default OutgoingCall;
