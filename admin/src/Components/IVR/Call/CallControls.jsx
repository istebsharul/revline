import React from 'react';
import { MdCallEnd } from 'react-icons/md';

const CallControls = ({ onEndCall, isMuted, handleMuteCall, handleResumeCall }) => (
    <div className="text-center">
        <button onClick={onEndCall} className="bg-red-500 p-4 rounded-full text-white">
            <MdCallEnd />
        </button>
        <button onClick={isMuted ? handleResumeCall : handleMuteCall} className="bg-gray-300 p-4 rounded-full text-gray-700">
            {isMuted ? 'Resume' : 'Mute'}
        </button>
    </div>
);

export default CallControls;
