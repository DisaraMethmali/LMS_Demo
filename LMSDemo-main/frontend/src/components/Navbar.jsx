import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Left side: Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">LMS</Link>
        </div>

        {/* Center: Links */}
        <ul className={`flex space-x-10 text-lg text-gray-800 ${isLoggedIn ? 'justify-center w-full' : ''}`}>
          <li>
            <Link
              to="/"
              className="text-md font-medium text-black-1500 hover:text-blue-600"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-md font-medium text-black-1500 hover:text-blue-600"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="text-md font-medium text-black-1500 hover:text-blue-600"
            >
              Blog
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link
                to="/courses"
                className="text-md font-medium text-black-1500 hover:text-blue-600"
              >
                Courses
              </Link>
            </li>
          )}
          {isLoggedIn && user?.role === 'admin' && (
            <li>
              <Link
                to="/info"
                className="text-md font-medium text-black-1500 hover:text-blue-600"
              >
                Info
              </Link>
            </li>
          )}
        </ul>

        {/* Right side: Login/Register or Logout Button */}
        <div>
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="bg-orange-500 text-white font-bold px-5 py-2 rounded-md shadow-md"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-black text-white font-bold px-4 py-2 rounded-md shadow-md hover:bg-gray-800 ml-4"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
