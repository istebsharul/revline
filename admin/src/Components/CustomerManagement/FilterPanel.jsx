import React, { useState } from 'react';

const FilterPanel = ({ onFilter }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    const handleFilter = () => {
        onFilter({ name, location });
    };

    return (
        <div className='flex items-center justify-between bg-white shadow-lg rounded-lg'>
            <h2 className="text-xl font-medium px-4">Filters</h2>
            <div className="flex items-center gap-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="px-2 border-b"
                />
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Location"
                    className="px-2 border-b"
                />
                <button
                    onClick={handleFilter}
                    className="bg-blue-500 text-white px-2 px-4 py-2 rounded-lg hover:bg-blue-600 text-nowrap text-sm"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

export default FilterPanel;
