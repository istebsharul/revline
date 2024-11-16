import React, { useState } from 'react';
import axios from 'axios';

const ImportParts = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setUploadStatus('Please upload a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('/api/v1/inventory/import-parts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus(`Success: ${response.data.message}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus(`Error: ${error.response?.data?.message || 'Failed to upload file'}`);
    }
  };

  return (
    <div>
      <h1>Import Parts</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fileInput">Choose CSV File:</label>
          <input
            type="file"
            id="fileInput"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default ImportParts;
