import { useState } from 'react';

const FeedbackForm = ({ onSubmit }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [explanation, setExplanation] = useState('');

  const handleReasonChange = (e) => {
    const value = e.target.value;
    setSelectedReason(value);
    
    // Show the feedback section only if "Not Interested" is selected
    if (value === 'not_interested') {
      setExplanation(''); // Clear the explanation field if not interested
    }
  };

  const handleExplanationChange = (e) => {
    setExplanation(e.target.value);
  };

  const handleSubmit = () => {
    const message = explanation || selectedReason; // Use explanation or reason as message
    onSubmit(message);
  };

  return (
    <div className='w-full flex flex-col justify-around items-center pb-4'>
      <p className='font-bold mb-2'>Please tell us why?</p>

      {/* Dropdown for reasons */}
      <select
        value={selectedReason}
        onChange={handleReasonChange}
        className='w-1/2 border-b border-black focus:outline-none p-1 mb-4'
      >
        <option value='' disabled>
          Select a reason
        </option>
        <option value='better_deal'>Found a Better Deal Elsewhere</option>
        <option value='too_expensive'>Too Expensive</option>
        <option value='no_longer_interested'>No Longer Interested</option>
        <option value='purchased_elsewhere'>Purchased From a Different Supplier</option>
        <option value='changed_mind'>Changed My Mind</option>
        <option value='waiting_discount'>Waiting for a Discount or Offer</option>
        <option value='need_time'>Need More Time to Decide</option>
        <option value='incomplete_quotation'>Quotation Is Incomplete</option>
        <option value='different_product'>Found a Different Product</option>
        <option value='not_interested'>Not Interested</option>
      </select>

      {/* Conditionally render the explanation input field */}
      {selectedReason === 'not_interested' && (
        <div className='w-full flex flex-col justify-around items-center pb-4'>
          <p className='font-bold mb-2'>Please Tell Us Why?</p>

          {/* Input field for explanation */}
          <input
            placeholder='Enter details here'
            value={explanation}
            onChange={handleExplanationChange}
            className='w-1/2 border-b border-black focus:outline-none p-1'
          />
        </div>
      )}

      <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-600 px-8 py-2 text-white rounded-full'>Submit</button>
    </div>
  );
};

export default FeedbackForm;
