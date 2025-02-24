import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Resume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

  // Fetch the resume data based on the ID from the location state
  useEffect(() => {
    const resumeId = location.state?.resumeId;
    if (!resumeId) {
      navigate('/dashboard'); // Redirect to dashboard if no resume ID is provided
      return;
    }

    const fetchResume = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/resumes/${resumeId}`);
        setResume(response.data);
      } catch (error) {
        console.error('Error fetching resume:', error);
        alert('Failed to fetch resume');
        navigate('/dashboard'); // Redirect to dashboard on error
      }
    };

    fetchResume();
  }, [location.state, navigate]);

  if (!resume) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-4xl bg-gray-900 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-8 text-blue-500 text-center">View Resume</h1>
        <div className="text-center">
          <p className="text-lg font-semibold mb-4">{resume.filename}</p>
          <iframe
            src={`http://localhost:5000/uploads/${resume.filename}`}
            title="Resume"
            className="w-full h-96 border border-gray-700 rounded-lg"
          />
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resume;