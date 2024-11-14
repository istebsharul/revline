import React, { useEffect } from 'react';
import DialPad from './Call/DialPad';
import CallPopup from './Call/CallPopup';
import CallLogs from './CallLogs';
import { useCallContext } from '../../Contexts/CallContext';

const IVRCall = () => {
  const {
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
    queueStatus,
    isOutgoingRef
  } = useCallContext();

  const handleNumberChange = (phoneNumber) => {
    console.log("HNC clicked!!");
    setPhoneNumber(phoneNumber);
  }

  return (
    <div className="flex flex-col items-center justify-center p-14 space-y-8">
      <div>
        {deviceStatus}
      </div>
      {/* <div>
        <button className='bg-blue-400 p-2 rounded-lg text-white' onClick={handleWaitingConnection}>Connect</button>
        Queue Status: {queueStatus}
      </div> */}
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
          callStatus={callStatus}
          type={!isOutgoingRef.current ? 'incoming' : 'outgoing'}
          onEndCall={handleEndCall}
          incomingConnection={incomingConnection}
          acceptCall={acceptCall}
          rejectCall={rejectCall}
          isMuted={isMuted}
          handleMuteCall={muteCall}
          handleResumeCall={resumeCall}
        />
      )}
      <CallLogs />
    </div>
  );
};

export default IVRCall;