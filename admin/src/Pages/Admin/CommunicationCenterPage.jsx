import React, { useState } from 'react';
import IVRDialPad from '../../Components/IVR/IVRDialpad';
import IVRSidebar from '../../Components/IVR/IVRSidebar';
import IVRSms from '../../Components/IVR/IVRSms';
import IVRCallLogs from '../../Components/IVR/IVRCallLogs';
import IVRCallRecordings from '../../Components/IVR/IVRCallRecording';

const mockLogs = [
  { caller: '+1234567890', time: '2024-08-01T10:00:00Z', duration: '5', status: 'completed' },
  { caller: '+0987654321', time: '2024-08-02T14:30:00Z', duration: '2', status: 'missed' },
];

const mockRecordings = [
  { caller: '+1234567890', date: '2024-08-01T10:00:00Z', url: 'https://example.com/recording1.mp3' },
  { caller: '+0987654321', date: '2024-08-02T14:30:00Z', url: 'https://example.com/recording2.mp3' },
];

const CommunicationCenter = () => {
  const [view, setView] = useState('dialpad');

  return (
    <div className="flex">
      <IVRSidebar setView={setView} />
      <div className="flex-grow bg-gray-100">
        {view === 'dialpad' && <IVRDialPad />}
        {view === 'sms' && <IVRSms />}
        {view === 'calllogs' && <IVRCallLogs logs={mockLogs} />}
        {view === 'callrecordings' && <IVRCallRecordings recordings={mockRecordings} />}
        {/* Additional components for call logs, call recordings, number switching, and IVR */}
      </div>
    </div>
  );
};

export default CommunicationCenter;
