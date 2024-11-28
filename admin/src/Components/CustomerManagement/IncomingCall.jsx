import React, { useEffect, useState } from 'react';

const IncomingCall = ({ connection, onAccept, onReject }) => {
  const [callTimer, setCallTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);


  useEffect(() => {
    if (connection) {
      setCallTimer(0);
      const interval = setInterval(() => {
        setCallTimer((prev) => prev + 1);
      }, 1000);
      setTimerInterval(interval);

      return () => clearInterval(interval);
    }
  }, [connection]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="incoming-call w-full flex flex-col justify-center items-center">
      <div className='mx-4 my-2'>
        <h2>Incoming Call...</h2>
        <p>Timer: {formatTime(callTimer)}</p>
      </div>
      <div className='w-full space-x-4'>
        <button className='bg-green-500 text-white px-2 py-1 rounded-lg' onClick={onAccept}>Accept</button>
        <button className='bg-red-500 text-white px-2 py-1 rounded-lg' onClick={onReject}>Reject</button>
      </div>
    </div>
  );
};

export default IncomingCall;
