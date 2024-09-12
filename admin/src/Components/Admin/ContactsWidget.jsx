import React from 'react';

const ContactsWidget = ({ emailCount, smsCount, callCount }) => {
  return (
    <div className="bg-white p-6 shadow rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex flex-col items-center">
        <h4 className="text-xl font-semibold">E-Mail</h4>
        <p>{emailCount}</p>
      </div>
      <div className="flex flex-col items-center">
        <h4 className="text-xl font-semibold">SMS</h4>
        <p>{smsCount}</p>
      </div>
      <div className="flex flex-col items-center">
        <h4 className="text-xl font-semibold">Calls</h4>
        <p>{callCount}</p>
      </div>
    </div>
  );
};

export default ContactsWidget;
