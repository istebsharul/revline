import React from 'react';

const CustomerDetails = ({ customer }) => {
    if (!customer) {
        return <p className="text-gray-500">Select a customer to see details.</p>;
    }

    // Calculate total amount spent and total number of orders
    const orders = customer.orders || [];
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.amount, 0).toFixed(2);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Customer Details</h2>
            <div className="bg-white p-6 shadow-md rounded-lg">
                <div className="mb-4">
                    <p className="text-lg font-medium">Name: <span className="font-normal">{customer.name}</span></p>
                    <p className="text-lg font-medium">Email: <span className="font-normal">{customer.email}</span></p>
                    <p className="text-lg font-medium">Phone: <span className="font-normal">{customer.phone}</span></p>
                    <p className="text-lg font-medium">Location: <span className="font-normal">{customer.location}</span></p>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-medium">Total Spent: <span className="font-normal">${totalSpent}</span></p>
                    <p className="text-lg font-medium">Total Orders: <span className="font-normal">{totalOrders}</span></p>
                </div>
                <div>
                    <h3 className="text-xl font-semibold mb-2">Order History</h3>
                    {totalOrders > 0 ? (
                        <ul className="list-disc pl-5 space-y-2">
                            {orders.map(order => (
                                <li key={order.id} className="text-gray-600">
                                    Order ID: {order.id}, Amount: ${order.amount.toFixed(2)}
                                    {order.product && (
                                        <>
                                            , Product: <span className="font-normal">{order.product.name}</span>
                                        </>
                                    )}
                                    {order.quantity && (
                                        <>
                                            , Quantity: <span className="font-normal">{order.quantity}</span>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No orders available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerDetails;
