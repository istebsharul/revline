import React, { useEffect } from 'react';
import SendQuotation from './sendQuotation';

const CustomerDetails = ({ customer }) => {

    const renderAddress = (address) => {
        if (!address) return null;
        return (
            <div className='flex gap-4'>
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
            </div>
        );
    };

    return (
        <div className="col-span-7 mt-4 p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Customer Details</h3>
            
            {/* Address Section */}
            <div className="mb-6">
                <div className="flex items-center text-gray-700">
                    <strong className="mr-2">Address:</strong> 
                    {renderAddress(customer.address)}
                </div>
            </div>

            {/* Vehicle Data Section */}
            <ul className="space-y-2">
                <p className='font-bold'>Customer's Requested Parts</p>
                {customer.vehicleData && customer.vehicleData.length > 0 ? (
                    customer.vehicleData.map((vehicle, index) => (
                        <li key={index} className="p-4 bg-gray-50 rounded-lg shadow-md">
                            <div className="flex gap-6 text-sm text-gray-800">
                                <p><strong>Year:</strong> {vehicle.year}</p>
                                <p><strong>Make:</strong> {vehicle.make}</p>
                                <p><strong>Model:</strong> {vehicle.model}</p>
                                <p><strong>Car Part:</strong> {vehicle.carPart}</p>
                                <p><strong>Variant:</strong> {vehicle.variant}</p>
                                <p><strong>Specification:</strong> {vehicle.specification}</p>
                                <p><strong>VIN:</strong> {vehicle.vin}</p>
                                <p><strong>Message:</strong> {vehicle.message}</p>
                            </div>
                        </li>
                    ))
                ) : (
                    <li className="text-gray-500">No vehicle data</li>
                )}
                <SendQuotation customer={customer}/>
            </ul>
            

            {/* Orders Section */}
            <div className="mt-6">
                <p className="font-semibold text-gray-700 mb-2"><strong>Orders:</strong></p>
                <ul className="space-y-2">
                    {customer.orders && customer.orders.length > 0 ? (
                        customer.orders.map(orderId => (
                            <li key={orderId} className="p-2 bg-gray-50 rounded-lg shadow-sm text-sm text-gray-800">
                                Order ID: {orderId}
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No orders</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default CustomerDetails;
