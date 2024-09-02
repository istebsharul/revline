import React, { useState } from 'react';
import IVRSidebar from '../../Components/IVR/IVRSidebar';
import IVRSms from '../../Components/IVR/IVRSms';
import IVRCall from '../../Components/IVR/IVRCall';
import IVREmail from '../../Components/IVR/IVREmail';

const CommunicationCenter = () => {
  const [view, setView] = useState('calllogs');

  return (
    <div className="w-full flex flex-col bg-gray-100">
      <IVRSidebar setView={setView} />
      <div className="w-full flex-grow bg-gray-100">
        {view === 'calllogs' && <IVRCall />}
        {view === 'sms' && <IVRSms />}
        {view === 'emails' && <IVREmail/>}
        {/* Additional components for call logs, call recordings, number switching, and IVR */}
      </div>
    </div>
  );
};

export default CommunicationCenter;
