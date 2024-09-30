import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import axios from 'axios';
import TicketsList from '../Dashboard/TicketsList';

function TicketsWidget() {
    const [isTicketsOpen, setIsTicketsOpen] = useState(true);
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [totalPages, setTotalPages] = useState(1);   // Total pages for pagination
    const ticketsPerPage = 30;                         // Set max tickets per page

    useEffect(() => {
        const fetchTickets = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`/api/v1/tickets/ticket`, {
                    params: {
                        page: currentPage,
                        limit: ticketsPerPage
                    }
                });
                setTickets(response.data.tickets);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching tickets:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, [currentPage]); // Fetch tickets when currentPage changes

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
                    <TicketsList tickets={tickets} loading={loading} />
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
