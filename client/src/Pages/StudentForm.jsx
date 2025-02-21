import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Student Form</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Name:</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300">Email:</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <Link
            to="/automate-task"
            state={{ student }} // Pass student data to the next page
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-center block"
          >
            Proceed to Automate Task
          </Link>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;