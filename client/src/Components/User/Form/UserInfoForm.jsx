import React from 'react';

const UserInfoForm = ({ userData, setUserData, errors }) => {
    return (
        <div className='space-y-2'>
            <div >
                <label className="block text-gray-200 text-sm p-1">Full Name*</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder='Enter Name'
                    value={userData.name}
                    onChange={e => setUserData({ ...userData, name: e.target.value })}
                />
                {errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
            </div>
            <div >
                <label className="block text-gray-200 text-sm p-1">Email* </label>
                <input
                    type="email"
                    className="w-full p-2 border rounded"
                    placeholder='Enter Email'
                    value={userData.email}
                    onChange={e => setUserData({ ...userData, email: e.target.value })}
                />
                {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
            </div>
            <div >
                <label className="block text-gray-200 text-sm p-1">Contact Number*</label>
                <input
                    type="tel"
                    className="w-full p-2 border rounded"
                    placeholder='Enter Contact Number'
                    value={userData.phone}
                    onChange={e => setUserData({ ...userData, phone: e.target.value })}
                />
                {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
            </div>
            <div >
                <label className="block text-gray-200 text-sm p-1">Zip Code*</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder='Enter your ZIP Code'
                    value={userData.zipcode}
                    onChange={e => setUserData({ ...userData, zipcode: e.target.value })}
                />
                {errors.zipcode && <p className="text-xs text-red-600">{errors.zipcode}</p>}
            </div>
        </div>
    );
};

export default UserInfoForm;
