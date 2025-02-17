import React, { useState } from 'react';
import OrderList from '../../Components/OrderManagement/OrderList';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FaFilter, FaFileExport } from 'react-icons/fa'; // Import necessary icons
import { GrNext,GrPrevious } from "react-icons/gr";
import axios from 'axios';
import toast from 'react-hot-toast';
import { MdAdd } from "react-icons/md";
import { useEffect } from 'react';


const fetchOrders = async ({ queryKey }) => {
    const [_key, { page, limit }] = queryKey; // Destructure queryKey to get page and limit
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/orders/all`, { params: { page, limit } });
    return data;
};

const SalesManagement = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [createNewLoading, setCreateNewLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filter, setFilter] = useState('');
    const [error, setError] = useState('');

    const queryClient = useQueryClient();

    // Use React Query to fetch orders, keeping previous data while loading new ones
    const { data, error: queryError, isLoading } = useQuery({
        queryKey: ['orders', { page, limit }],
        queryFn: fetchOrders,
        staleTime: 5 * 60 * 1000, // 5min in milliseconds
        keepPreviousData: true,
    });

    const orders = data?.orders || [];

    // Function to search for an order in cache or fetch from API if not found
    const getOrderByFilter = async (searchTerm) => {
        const lowercasedFilter = searchTerm.toLowerCase();

        const allCachedOrders = queryClient
            .getQueryCache()
            .findAll(['orders']) // Get all keys matching 'orders'
            .flatMap(query => query.state.data?.orders ?? []); // Extract orders

        console.log("All Cached Orders:", allCachedOrders);


        if (allCachedOrders.length > 0) {
            const lowercasedFilter = filter.toLowerCase();

            const foundOrders = allCachedOrders.filter(order => {
                const name = (order.customer.name ?? '').toLowerCase();
                const status = (order.status ?? '').toLowerCase();
                const email = (order.customer?.email ?? '').toLowerCase();
                const phone = (order.customer?.phone ?? '').toLowerCase();
                const orderId = (order._id ?? '').toLowerCase();
                const quoteNumber = (order.quotations?.quote_number ?? '').toLowerCase();
                const orderStatus = (order.order_disposition_details?.order_status ?? '').toLowerCase();
                const adminStatus = (order.order_disposition_details?.admin_status ?? '').toLowerCase();

                return (
                    name.includes(lowercasedFilter) ||
                    status.includes(lowercasedFilter) ||
                    email.includes(lowercasedFilter) ||
                    phone.includes(lowercasedFilter) ||
                    orderId.includes(lowercasedFilter) ||
                    quoteNumber.includes(lowercasedFilter) ||
                    orderStatus.includes(lowercasedFilter) ||
                    adminStatus.includes(lowercasedFilter)
                );
            });

            console.log("Filtered Orders from Cache:", foundOrders);

            if (foundOrders.length > 0) {
                return setFilteredOrders(foundOrders);
            }
        }

        // If no orders found in cache, fetch from API
        try {
            setLoading(true);
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/orders/search`, {
                params: { search: searchTerm, page, limit },
            });
            console.log(data);
            setFilteredOrders(data.orders);
            setLoading(false);
        } catch (error) {
            toast.error('No matching orders found');
            setFilteredOrders([]);
            setLoading(false);
        }
    };


    useEffect(() => {
        // console.log("All Cache Data:", queryClient.getQueryCache().getAll());

        const delaySearch = setTimeout(() => {
            if (filter) {
                console.log("Searching for:", filter);
                getOrderByFilter(filter);
            } else {
                setFilteredOrders(orders || []);
            }
        }, 1000); // 500ms delay

        return () => clearTimeout(delaySearch); // Cleanup function to reset timeout on re-typing
    }, [filter, orders]);

    const totalPages = data?.pagination?.totalPages || 1;

    // console.log(orders);
    // Handle pagination
    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    // Handle deletion of an order
    const handleDelete = async (orderId) => {
        const confirmed = confirm("Are you sure you want to delete?");
        if (confirmed) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/orders/${orderId}`);
                queryClient.invalidateQueries(['orders']); // Invalidate the 'orders' query to refetch
                toast.success("Order deleted successfully");
            } catch (error) {
                toast.error('Failed to delete order');
                console.error('Error deleting order:', error);
            }
        }
    };

    const handleCreateNewEmptyOrderClick = async () => {
        const alert = window.confirm('Are you sure you want to create New Empty Order?');

        if (!alert) {
            return;
        }

        try {
            setCreateNewLoading(true);
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
            setCreateNewLoading(false);
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
                escapeCsvValue(formatDispositionHistory(order?.disposition_history))])
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
        <div className="w-full h-full flex flex-col justify-start items-center bg-gray-400">
            <div className="w-full flex items-center justify-between py-2 px-4 bg-white">
                <h2 className="w-[10%] text-2xl flex flex-col font-semibold text-left">
                    <span>Order List</span>
                    <span className='text-xs text-gray-500'>Total Orders - {filteredOrders.length}</span>
                </h2>
                <div className="w-[60%] flex justify-evenly items-center space-x-4 bg-red">
                    <button
                        onClick={handleCreateNewEmptyOrderClick}
                        className='w-1/3 flex justify-center items-center p-2 bg-blue-600 text-white text-nowrap rounded-md shadow-md hover:bg-blue-700' disabled={createNewLoading}><MdAdd className="mr-2 h-5 w-5" />{createNewLoading ? "Creating..." : "Create New Order"}</button>
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
            <main className="w-full">
                {isLoading || loading ? (
                    <div className="text-center">
                        <svg className="animate-spin h-5 w-5 text-indigo-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                        </svg>
                        <p className="text-indigo-500 mt-2">Loading orders...</p>
                    </div>
                ) : queryError ? (
                    <div className="text-[#f6251a] text-center">Failed to fetch orders. Please try again later.</div>
                ) : (
                    <div className='w-full h-full flex flex-col justify-between items-center bg-white'>
                        <OrderList filteredOrders={filteredOrders} setFilteredOrders={setFilteredOrders} onSelectOrder={setSelectedOrder} onDelete={handleDelete} />
                        <div className="flex flex-col justify-center items-center p-2">
                            <div className='w-full flex justify-center items-center gap-8'>
                                <button
                                    onClick={handlePrevPage}
                                    disabled={page === 1}
                                    className="bg-gray-300 hover:bg-gray-800 hover:text-white rounded-full p-2"
                                >
                                    <GrPrevious className='w-3 h-3'/>
                                </button>
                                <span className="text-center text-gray-500">
                                    Page <span className='font-bold text-gray-700'>{page}</span> of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={page === totalPages}
                                    className="bg-gray-300 hover:bg-gray-800 hover:text-white rounded-full p-2"
                                >
                                    <GrNext className='w-3 h-3' />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default SalesManagement;
