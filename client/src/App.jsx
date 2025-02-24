import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import axios from 'axios';
import StudentDetails from './Pages/StudentDetails';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log(isLoggedIn);
  
  const checkToken = async () => {
    if(localStorage.getItem('token')){
      const me = await axios.get('http://localhost:5000/api/auth/me', {headers : {Authorization: `Bearer ${localStorage.getItem('token')}`}});
      
      if(me.status === 200){
        setIsLoggedIn(true);
      }
    }
  }
  useEffect(() => {
    checkToken();
  },[])
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
                {isLoggedIn && <Link
                  to="/dashboard"
                  className="text-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>}
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          {
            isLoggedIn &&( <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route exact path="/student/:id" element={<StudentDetails />} />
            </>)
          }
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login onLogin={()=>setIsLoggedIn(true)}/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
