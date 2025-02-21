import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const AutomateTask = () => {
  const location = useLocation();
  const student = location.state?.student; // Get student data from the previous page

  const [searchEmail, setSearchEmail] = useState('');
  const [foundStudent, setFoundStudent] = useState(null);

  const handleSearch = () => {
    if (student.email === searchEmail) {
      setFoundStudent(student);
    } else {
      setFoundStudent(null);
    }
  };

  const handleSend = () => {
    if (foundStudent) {
      alert(`Task sent to ${foundStudent.name} (${foundStudent.email})`);
    } else {
      alert('No student found with the provided email.');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Automate Task</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300">Search by Email:</label>
          <input
            type="email"
            placeholder="Enter student email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>

        {foundStudent && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-500">Student Found:</h3>
            <p className="text-gray-300">Name: {foundStudent.name}</p>
            <p className="text-gray-300">Email: {foundStudent.email}</p>
          </div>
        )}

        <button
          onClick={handleSend}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Send Task
        </button>
      </div>
    </div>
  );
};

export default AutomateTask;