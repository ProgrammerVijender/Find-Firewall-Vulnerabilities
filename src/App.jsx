import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [vulnerabilityReport, setVulnerabilityReport] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload and vulnerability check
  const handleFindVulnerability = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    // Create form data
    const formData = new FormData();
    formData.append('rules', selectedFile);

    try {
      setLoading(true);
      const response = await axios.post('https://find-firewall-vulnerabilities.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setVulnerabilityReport(response.data.generatedContent);
      setLoading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setVulnerabilityReport('Error occurred while fetching vulnerability data.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-300">
      <div className="bg-white p-6 my-10 rounded shadow-md w-full max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-700 mb-4">Find Firewall Vulnerabilities</h1>

        {/* File Upload */}
        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="border border-gray-300 p-2 w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleFindVulnerability}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Find Vulnerability'}
        </button>

        {/* Output Area */}
        {vulnerabilityReport && (
          <div className="mt-4 bg-gray-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold">Vulnerability Report:</h2>
            <pre className="text-gray-700 whitespace-pre-wrap">{vulnerabilityReport}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
