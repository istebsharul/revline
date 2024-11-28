import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ContactForm = () => {
    const initialFormData = {
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [invalidFields, setInvalidFields] = useState({});

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateFormData = (data) => {
        const errors = {};

        if (data.name.trim() === '') errors.name = 'Name is required.';
        if (data.email.trim() === '' || !data.email.includes('@') || !data.email.includes('.')) errors.email = 'Invalid email address.';
        if (data.message.trim() === '') errors.message = 'Message cannot be empty.';
        if (data.phoneNumber.trim()=== '') errors.message = 'Phone Number cannot be empty.';
        if (data.phoneNumber.trim() && !/^\d*$/.test(data.phoneNumber)) errors.phoneNumber = 'Phone number must contain only numbers.';

        return errors;
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        try {
            const errors = validateFormData(formData);

            if (Object.keys(errors).length === 0) {
                console.log('Form data:', formData);

                const response = await fetch('https://server.revlineautoparts.com/api/v1/auth/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    console.log('Message sent successfully!');
                    setFormData(initialFormData);
                    toast.success("Thank you for reaching out! We have received your message and will get back to you as soon as possible.");
                    setInvalidFields({});
                } else {
                    console.error('Failed to Send message');
                }
            } else {
                console.log(errors);
                if (errors.email) toast.error(errors.email);
                if (errors.phoneNumber) toast.error(errors.phoneNumber);
                if (errors.name) toast.error(errors.name);
                if (errors.message) toast.error(errors.message);
                setInvalidFields(errors);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="w-full flex flex-col justify-center items-center text-[#f6251a]">
                <div className='flex flex-col justify-center items-center'>
                    <h1 className="md:text-3xl text-2xl mb-4 text-center text-[#f6251a] font-inter">Contact Us</h1>
                </div>
                <form onSubmit={handleSendMessage} className="block md:w-2/5 w-4/5 space-y-6">
                    <div>
                        <h1 className='py-1 text-sm'>Name</h1>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full pl-5 py-2 bg-transparent text-black border rounded-xl placeholder-gray-400 placeholder:text-sm focus:border-blue-500 ${invalidFields.name ? 'border-blue-500 border-2' : 'border-gray-400'}`}
                        />
                    </div>
                    <div className="mb-4">
                        <h1 className='py-1 text-sm'>Email</h1>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full pl-5 py-2 bg-transparent text-black border rounded-xl placeholder-gray-400 placeholder:text-sm focus:border-blue-500 ${invalidFields.email ? 'border-blue-500 border-2' : 'border-gray-400'}`}
                        />
                    </div>
                    <div className="mb-4">
                        <div className='flex justify-between text-sm'>
                            <p>Phone</p>
                        </div>
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="Phone number"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className={`w-full pl-5 py-2 bg-transparent text-black border rounded-xl placeholder-gray-400 placeholder:text-sm focus:border-blue-500 ${invalidFields.phoneNumber ? 'border-blue-500 border-2' : 'border-gray-400'}`}
                        />
                    </div>
                    <div className="mb-4">
                    <h1 className='py-1 text-sm'>Message</h1>
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className={`w-full pl-5 py-2 bg-transparent text-black border rounded-xl placeholder-gray-400 placeholder:text-sm focus:border-blue-500 ${invalidFields.message ? 'border-blue-500 border-2' : 'border-gray-400'}`}
                        />
                    </div>
                    <div className="md:w-full flex md:flex-row flex-col md:space-x-4 md:space-y-0 space-y-4">
                        <button
                            type="submit"
                            className="w-full text-white bg-[#f6251a] hover:bg-red-700 py-2 px-4 rounded-xl"
                        >
                            Send message
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactForm;
