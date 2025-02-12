import React, { useState, useEffect } from 'react';
import { FaFilter, FaFileExport } from 'react-icons/fa'; // Import necessary icons
import axios from 'axios'; // Import axios for API calls
import OrderListItem from './OrderListItem'; // Import the new OrderListItem component
import { MdAdd } from "react-icons/md";

const OrderList = ({ orders }) => {
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        // Filter orders based on orderId, customer name, phone, email, or status
        let filtered = filter
            ? orders.filter(order => {
                const lowercasedFilter = filter.toLowerCase();
                const customerName = (order.customer?.name ?? '').toLowerCase();
                const status = (order.status ?? '').toLowerCase();
                const email = (order.customer?.email ?? '').toLowerCase();
                const phone = (order.customer?.phone ?? '').toLowerCase();
                const orderId = (order._id ?? '').toLowerCase();
                const quoteNumber = (order.quotations?.quote_number ?? '').toLowerCase();

                return customerName.includes(lowercasedFilter) ||
                    status.includes(lowercasedFilter) ||
                    email.includes(lowercasedFilter) ||
                    phone.includes(lowercasedFilter) ||
                    orderId.includes(lowercasedFilter) ||
                    quoteNumber.includes(lowercasedFilter);
            })
            : orders;

        // Reverse the order list
        // filtered = filtered.slice().reverse();

        setFilteredOrders(filtered);
    }, [filter, orders]);


    // Function to handle deletion of an order
    const handleDelete = async (orderId) => {
        const confirmed = window.confirm('Are you sure you want to delete this order? You won’t be able to get it back.');
        if (!confirmed) {
            return;
        }

        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/orders/${orderId}`);
            setFilteredOrders(filteredOrders.filter(order => order._id !== orderId));
        } catch (error) {
            console.error(error);
            setError('Failed to delete order. Please try again.');
        }
    };

    function formatDate(createdAt) {
        const date = new Date(createdAt);
        const options = { month: "long", day: "numeric", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }

    const handleCreateNewEmptyOrderClick = async () => {
        const alert = window.confirm('Are you sure you want to create New Empty Order?');

        if(!alert){
            return;
        }

        try {
            setLoading(true);
            setError('');
    
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/orders/create-empty-order`);
            
            const newOrder = {
                _id: response.data.orderId,
                customer: response.data.customer,
            };
    
            setFilteredOrders(prevOrders => [newOrder, ...prevOrders]);
    
        } catch (error) {
            console.error("Error creating new order:", error);
            setError("Failed to create a new order. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    

    // Function to handle exporting the order list to CSV
    const handleExport = () => {
        // Function to escape CSV values
        const escapeCsvValue = (value) => {
            if (typeof value === 'string' && (value.includes(',') || value.includes(';') || value.includes('"'))) {
                return `"${value.replace(/"/g, '""')}"`; // Escape double quotes by doubling them
            }
            return value;
        };

        const formatDispositionHistory = (history) => {
            if (!Array.isArray(history) || history.length === 0) {
                return 'N/A'; // Return N/A if the history is empty or not an array
            }
            return history
                .map(entry => 
                    `Agent Notes: ${entry.agent_notes || 'N/A'}, Updated At: ${new Date(entry.updated_at).toLocaleString()}`
                )
                .join('; '); // Separate entries with a semicolon
        };        

        const csvContent = [
            [
                'Order ID',
                'Customer Name',
                'Customer Email',
                'Customer Phone',
                'Zip Code',
                'Requested Date',
                'Quote Number',
                'Year',
                'Make',
                'Model',
                'Part',
                'Variant',
                'Transmission',
                'Shipping Size',
                'Shipping Cost',
                'Shipping Speed',
                'Cost Price',
                'Quoted Price',
                'Gross Profit',
                'Shipping Customer Name',
                'Shipping Customer Email',
                'Shipping Customer Phone',
                'Shipping Zip Code',
                'Shipping Address Line 1',
                'Shipping Address Line 2',
                'Shipping City',
                'Shipping State/Region',
                'Shipping Country/Region',
                'Quotation Number',
                'Quotation Status',
                'Quotation Created At',
                'Invoice Number',
                'Invoice Status',
                'Invoice Created At',
                'Payment ID',
                'Transaction ID',
                'Payment Status',
                'Payment Amount',
                'Agent Notes',
                'Order Status',
                'Specific Request for Warehouse Team',
                'Disposition History'
            ],
            ...filteredOrders.map((order) => [
                order?._id.slice(-6) || 'N/A',
                escapeCsvValue(order?.customer?.name || 'N/A'),
                escapeCsvValue(order?.customer?.email || 'N/A'),
                escapeCsvValue(order?.customer?.phone || 'N/A'),
                escapeCsvValue(order?.customer?.zipcode || 'N/A'),
                escapeCsvValue(formatDate(order?.request_date) || 'N/A'),
                escapeCsvValue(order?.quotations?.quote_number || 'N/A'),
                escapeCsvValue(order?.order_summary?.year || 'N/A'),
                escapeCsvValue(order?.order_summary?.make || 'N/A'),
                escapeCsvValue(order?.order_summary?.model || 'N/A'),
                escapeCsvValue(order?.order_summary?.part_name || 'N/A'),
                escapeCsvValue(order?.order_summary?.variant || 'N/A'),
                escapeCsvValue(order?.order_summary?.transmission || 'N/A'),
                escapeCsvValue(order?.pricing_details?.shipping_size || 'N/A'),
                escapeCsvValue(order?.pricing_details?.shipping_cost || 'N/A'),
                escapeCsvValue(order?.pricing_details?.shipping_speed || 'N/A'),
                escapeCsvValue(order?.pricing_details?.cost_price || 'N/A'),
                escapeCsvValue(order?.pricing_details?.quoted_price || 'N/A'),
                escapeCsvValue(order?.pricing_details?.gross_profit || 'N/A'),
                escapeCsvValue(order?.shipping_details?.customer_name || 'N/A'),
                escapeCsvValue(order?.shipping_details?.customer_email || 'N/A'),
                escapeCsvValue(order?.shipping_details?.customer_phone || 'N/A'),
                escapeCsvValue(order?.shipping_details?.zipcode || 'N/A'),
                escapeCsvValue(order?.shipping_details?.address_line_1 || 'N/A'),
                escapeCsvValue(order?.shipping_details?.address_line_2 || 'N/A'),
                escapeCsvValue(order?.shipping_details?.city || 'N/A'),
                escapeCsvValue(order?.shipping_details?.state_or_region || 'N/A'),
                escapeCsvValue(order?.shipping_details?.country_or_region || 'N/A'),
                escapeCsvValue(order?.quotations?.quote_number || 'N/A'),
                escapeCsvValue(order?.quotations?.status || 'N/A'),
                escapeCsvValue(formatDate(order?.quotations?.created_at) || 'N/A'),
                escapeCsvValue(order?.invoices?.invoice_number || 'N/A'),
                escapeCsvValue(order?.invoices?.status || 'N/A'),
                escapeCsvValue(formatDate(order?.invoices?.created_at) || 'N/A'),
                escapeCsvValue(order?.payment_details?.payment_id || 'N/A'),
                escapeCsvValue(order?.payment_details?.transaction_id || 'N/A'),
                escapeCsvValue(order?.payment_details?.payment_status || 'N/A'),
                escapeCsvValue(order?.payment_details?.amount || 'N/A'),
                escapeCsvValue(order?.order_disposition_details?.agent_notes || 'N/A'),
                escapeCsvValue(order?.order_disposition_details?.order_status || 'N/A'),
                escapeCsvValue(order?.order_disposition_details?.specific_request_for_warehouse_team || 'N/A'),
                escapeCsvValue(formatDispositionHistory(order?.disposition_history))            ])
        ]
            .map(e => e.join(';')) // Use semicolon as delimiter
            .join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'order_list.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    return (
        <div className="w-full mx-auto p-4 bg-white">
            <div className="w-full flex items-center justify-between mb-6">
                <h2 className="w-[10%] text-2xl flex flex-col font-semibold text-left">
                    <span>Order List</span>
                    <span className='text-xs text-gray-500'>Total Orders - {filteredOrders.length}</span>
                </h2>
                <div className="w-[60%] flex justify-evenly items-center space-x-4 bg-red">
                    <button 
                        onClick={handleCreateNewEmptyOrderClick}
                        className='w-1/3 flex justify-center items-center p-2 bg-blue-600 text-white text-nowrap rounded-md shadow-md hover:bg-blue-700' disabled={loading}><MdAdd className="mr-2 h-5 w-5"/>{loading ? "Creating..." : "Create New Order"}</button>
                    <div className="w-full relative">
                        <input
                            type="text"
                            placeholder="Filter by Order ID, Customer Name, Phone, Email, or Status"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <FaFilter className="absolute right-2 top-2 text-gray-500" />
                    </div>
                    <button
                        onClick={handleExport}
                        className="flex items-center p-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
                        title="Export to CSV"
                    >
                        <FaFileExport className="mr-2 h-5 w-5" />
                        Export
                    </button>
                </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-t-lg">
                <div className="flex justify-between text-gray-600 font-semibold">
                    <div className="w-2">Index</div>
                    <div className='w-20'>Order ID</div>
                    <div className='w-20'>Quote No.</div>
                    <div className="w-40">Name</div>
                    <div className="w-40">Date</div>
                    <div className="w-60">Email</div>
                    <div className="w-20">Phone</div>
                    <div className="w-20">Actions</div>
                </div>
            </div>
            {loading ? (
                <div className="text-center">
                    <svg className="animate-spin h-5 w-5 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    </svg>
                    <p className="text-indigo-500 mt-2">Loading orders...</p>
                </div>
            ) : error ? (
                <div className="text-[#f6251a] text-center">{error}</div>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {filteredOrders.map((order, index) => (
                        <OrderListItem key={order._id} order={order} index={index} handleDelete={handleDelete} />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrderList;
