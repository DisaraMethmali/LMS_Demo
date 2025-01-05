import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UserInfo from "../components/UserInfo"; // Import UserInfo component
import lmsImage from '../assets/lms.png';
import Footer from '../components/Footer'; // Correct import path for Footer
import '../index.css';

const Home = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Only render UserInfo on Course page if user is logged in
  const showUserInfo = location.pathname.includes("/course") && user;

  return (
    <>
      <main className="container mx-auto flex flex-col md:flex-row items-center mt-16 px-6">
        {/* Left Section: LMS Details */}
        <div className="w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight mb-6">
            Welcome to <span className="text-blue-600">LMS</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Empowering education with an innovative learning platform. Enhance
            your skills, collaborate with peers, and achieve your educational
            goals with our user-friendly LMS.
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2 bold">
            <li>Interactive courses with top instructors</li>
            <li>Track your progress and achievements</li>
            <li>Accessible learning anytime, anywhere</li>
          </ul>
        </div>

        {/* Right Section: Illustration */}
        <div className="w-full md:w-1/2 ">
          <img
            src={lmsImage}
            alt="LMS Illustration"
            style={{ width: '100%', height: '500px' }}
          />
        </div>

        {/* Conditionally render UserInfo only on Course page if user is logged in */}
        {showUserInfo && <UserInfo />}
      </main>
      {/* Add Footer */}
      <Footer />
    </>
  );
};

export default Home;

