import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white flex flex-col items-center justify-center p-6">
      {/* Glassmorphism Card */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center border border-white/10">
        {/* Title */}
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mb-6 animate-fade-in">
          HR Automation Workflow
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-300 mb-8 animate-fade-in-up">
          Streamline your HR processes with our automated workflow solutions.
        </p>

        {/* Get Started Button */}
        <Link
          to="/signup"
          className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg animate-bounce"
        >
          Get Started
        </Link>
      </div>

      {/* Additional Decorative Elements */}
      <div className="absolute bottom-8 text-sm text-gray-400">
        <p>© 2023 HR Automation. All rights reserved.</p>
      </div>
    </div>
  );
};

export default LandingPage;