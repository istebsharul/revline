import { useEffect, useState } from 'react';

const FeedbackForm = ({ onSubmit, isSubmitDisable, setIsSubmitDisable }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [explanation, setExplanation] = useState('');

  useEffect(()=>{
    if(selectedReason !== ''){
      setIsSubmitDisable(false)
    }
  })

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
    <div className='w-full flex flex-col justify-around items-center pb-2'>
      <p className='text-xl font-medium mb-4'>Please tell us why?</p>

      {/* Dropdown for reasons */}
      <select
        value={selectedReason}
        onChange={handleReasonChange}
        className='w-2/3 focus:outline-none px-4 py-2 mb-1 rounded-md border'
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
        <option value='not_interested'>Others</option>
      </select>


      {isSubmitDisable && <p className='text-xs text-red-600'>Please select the reason to submit cancellation.</p>}
      {/* Conditionally render the explanation input field */}
      {selectedReason === 'not_interested' && (
        <div className='w-2/3 flex flex-col justify-around items-center'>
          {/* Input field for explanation */}
          <input
            placeholder='Enter details here'
            value={explanation}
            onChange={handleExplanationChange}
            className='w-full focus:outline-none p-2 rounded-md'
          />
        </div>
      )}
      <button 
        disabled={isSubmitDisable}
        onClick={handleSubmit} 
        className={`bg-blue-500 hover:bg-blue-600 px-8 py-2 mt-4 text-white rounded-full ${isSubmitDisable ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed': ''}`}
      >
        Submit
      </button>
    </div>
  );
};

export default FeedbackForm;
