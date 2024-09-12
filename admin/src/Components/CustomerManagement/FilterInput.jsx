import React from "react";
import { FaFilter } from "react-icons/fa";

const FilterInput = ({ filter, setFilter }) => {
    return (
        <div className="w-full relative">
            <input
                type="text"
                placeholder="Filter by Name, Email, or Phone"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <FaFilter className="absolute right-2 top-2 text-gray-500" />
        </div>
    );
};

export default FilterInput;
