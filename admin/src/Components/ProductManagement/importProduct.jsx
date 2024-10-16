import React, { useState } from 'react';
import axios from 'axios';
import { FaFileImport } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ImportProducts = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);

            setLoading(true);

            try {
                await axios.post('/api/v1/inventory/import', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Products imported successfully!');
            } catch (error) {
                toast.error('Failed to import products. Please try again.');
            } finally {
                setLoading(false);
                setFile(null); // Clear the file input after upload
            }
        }
    };

    return (
        <div className="">
            <label
                className="flex items-center p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 cursor-pointer"
            >
                <FaFileImport className="mr-2 h-5 w-5" />
                Import
                <input
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
            {loading && <div className="mt-4 text-blue-600 text-center">Uploading...</div>}
        </div>
    );
};

export default ImportProducts;
