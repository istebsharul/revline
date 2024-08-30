import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Banner from '../../Components/User/Banner';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const user = useSelector(state => state.auth?.user);

  const handleGoBack = () => {
    navigate('/');
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const sampleOrders = [
          {
            _id: 'XYZ0864395',
            totalAmount: 100.67,
            status: 'Completed',
            items: [
              { product: { _id: 'p1', name: 'BRILE water filter carafe', price: 29.89 }, quantity: 6 },
            ],
            createdAt: '2021-06-05',
            shipping: 11.00,
            tax: 0.00,
          },
        ];

        await new Promise(resolve => setTimeout(resolve, 500));
        setOrders(sampleOrders);
      } catch (err) {
        setError('There was an error fetching your orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col justify-center items-center bg-gray-100 md:pt-10 pt-16">
      <div className="relative">
        <Banner />
        <p className="absolute text-4xl inset-0 flex justify-center items-center text-white">
          Your Orders
        </p>
      </div>

      <div className="md:w-3/5 min-h-screen p-4 md:p-6 md:mt-12 mt-20">
        {orders.length === 0 ? (
          <p className="text-center text-gray-500">You have no orders.</p>
        ) : (
          <div>
            <h1 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">Thanks for ordering</h1>
            <p className="text-base md:text-lg mb-4">Your payment went through</p>
            <div>
              {orders.map(order => (
                <div key={order._id} className="bg-white p-4 md:p-6 rounded-lg shadow-lg space-y-4 mb-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0">
                    <div>
                      <p className="text-gray-700 text-sm md:text-base">Order Number</p>
                      <h2 className="text-lg md:text-xl font-bold">{order._id}</h2>
                    </div>
                    <div>
                      <p className="text-gray-700 text-sm md:text-base">Date</p>
                      <h2 className="text-lg md:text-xl font-bold">{new Date(order.createdAt).toLocaleDateString()}</h2>
                    </div>
                    <button className="px-3 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg text-sm md:text-base">
                      View Invoice
                    </button>
                  </div>

                  <div className="border-t border-b py-4">
                    {order.items.map(item => (
                      <div key={item.product._id} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-0">
                        <div className="flex flex-col md:flex-row items-start md:items-center">
                          <img
                            src="/path/to/product-image.jpg"
                            alt={item.product.name}
                            className="w-12 h-12 md:w-16 md:h-16 mr-4 mb-2 md:mb-0"
                          />
                          <div>
                            <h3 className="text-base md:text-lg font-semibold">{item.product.name}</h3>
                            <p className="text-gray-500 text-sm md:text-base">Maecenas 0.7 commodo sit</p>
                            <p className="text-gray-600 text-sm md:text-base">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-lg font-semibold">${item.product.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 text-gray-700">
                    <div className="flex justify-between text-sm md:text-base">
                      <p>Subtotal</p>
                      <p>${order.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <p>Shipping</p>
                      <p>${order.shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm md:text-base">
                      <p>Tax</p>
                      <p>${order.tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between font-bold text-sm md:text-base">
                      <p>Order Total</p>
                      <p>${order.totalAmount.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-6 p-4 bg-gray-100 rounded-lg space-y-4 md:space-y-2">
                    <div className="flex flex-col md:flex-row justify-between text-sm md:text-base">
                      <div>
                        <h4 className="font-bold">Delivery Address</h4>
                        <p>{user.name}</p>
                        <p>4767 Woodland Terrace, California, CA 95821</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <h4 className="font-bold">Shipping Information</h4>
                        <p>{user.email}</p>
                        <p>916-971-2145</p>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <h4 className="font-bold">Payment Information</h4>
                        <p>Mastercard Ending with 4242</p>
                        <p>Expires 02 / 28</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4 md:mt-6">
                    <button
                      className="px-6 py-2 md:px-8 md:py-3 bg-orange-500 text-white font-bold rounded-lg text-sm md:text-base"
                      onClick={handleGoBack}
                    >
                      Go Back Shopping
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
