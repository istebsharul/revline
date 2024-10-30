import React from 'react';
import DraggableWrapper from './DraggableWrapper';
import IncomingCall from '../../CustomerManagement/IncomingCall';
import OutgoingCall from '../../CustomerManagement/OutgoingCall';
import CallStatusComponent from '../CallStatusUpdate';

const CallPopup = ({ type, onEndCall, incomingConnection, acceptCall, rejectCall, isMuted, handleMuteCall, handleResumeCall }) => {
  return (
    <DraggableWrapper>
      <div className="bg-white p-6 rounded-md shadow-lg text-center">
        <CallStatusComponent/>
        {type === 'incoming' && incomingConnection ? (
          <div>
            <IncomingCall connection={incomingConnection} onAccept={acceptCall} onReject={rejectCall}/>
          </div>
        ) : (
          <div>
            <OutgoingCall onEndCall={onEndCall} handleMuteCall={handleMuteCall} handleResumeCall={handleResumeCall} isMuted={isMuted} />
          </div>
        )}
      </div>
    </DraggableWrapper>
  );
};

export default CallPopup;
