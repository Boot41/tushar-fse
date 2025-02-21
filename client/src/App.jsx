import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import StudentForm from './Pages/StudentForm';
import AutomateTask from './Pages/AutomateTask';

const App = () => {
  return (
    <Router>
      <div className="bg-black min-h-screen">
        <nav className="bg-gray-900 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link
                  to="/"
                  className="text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/signup"
                  className="text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Signup
                </Link>
                <Link
                  to="/login"
                  className="text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/students" element={<StudentForm />} />
          <Route path="/automate-task" element={<AutomateTask />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
