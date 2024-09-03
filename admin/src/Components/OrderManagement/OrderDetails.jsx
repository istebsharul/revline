import React from 'react';

const OrderDetails = ({ order }) => {
    if (!order) return <p>Select an order to view details.</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p><strong>ID:</strong> {order._id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
            <h3 className="text-lg font-medium mt-4">Items:</h3>
            <ul>
                {order.items.map((item, index) => (
                    <li key={index} className="py-1">
                        <p><strong>Product:</strong> {item.productName}</p>
                        <p><strong>Quantity:</strong> {item.quantity}</p>
                        <p><strong>Price:</strong> ${item.price.toFixed(2)}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderDetails;
