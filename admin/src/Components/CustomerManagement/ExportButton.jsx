import React from "react";
import { FaFileExport } from "react-icons/fa";

const ExportButton = ({ handleExport }) => {
    return (
        <button
            onClick={handleExport}
            className="flex items-center p-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700"
            title="Export to CSV"
        >
            <FaFileExport className="mr-2 h-5 w-5" />
            Export
        </button>
    );
};

export default ExportButton;
