import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TicketsList from '../Dashboard/TicketsList';

const fetchTickets = async ({ queryKey }) => {
    const [, { page, limit }] = queryKey;
    const response = await axios.get(`/api/v1/tickets/ticket`, {
        params: {
            page,
            limit
        }
    });
    return response.data;
};

function TicketsWidget() {
    const [isTicketsOpen, setIsTicketsOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const ticketsPerPage = 30;                         // Set max tickets per page

    // React Query to fetch tickets with stale time of 1 hour
    const { data, error, isLoading } = useQuery({
        queryKey: ['tickets', { page: currentPage, limit: ticketsPerPage }],
        queryFn: fetchTickets,
        staleTime: 3600000, // 1 hour in milliseconds
        keepPreviousData: true, // Keeps previous data while fetching new data
    });

    const tickets = data?.tickets || [];
    const totalPages = data?.totalPages || 1;
    const openTicketsCount = tickets.filter(ticket => ticket.status !== 'Closed').length;

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="w-full h-fit p-2 rounded-lg">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsTicketsOpen(!isTicketsOpen)}
            >
                <h2 className="text-lg font-semibold text-gray-700">Tickets({openTicketsCount})</h2>
                {isTicketsOpen ? <FiChevronUp /> : <FiChevronDown />}
            </div>

            {isTicketsOpen && (
                <>
                    {isLoading ? (
                        <p>Loading tickets...</p>
                    ) : error ? (
                        <p>Error fetching tickets.</p>
                    ) : (
                        <TicketsList tickets={tickets} />
                    )}

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center text-sm space-x-4 mt-2">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`text-gray-600 ${currentPage === 1 ? 'cursor-not-allowed' : 'hover:underline'}`}
                        >
                            Previous
                        </button>
                        <span className="text-gray-800">Page {currentPage} of {totalPages}</span>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`text-gray-600 ${currentPage === totalPages ? 'cursor-not-allowed' : 'hover:underline'}`}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default TicketsWidget;
