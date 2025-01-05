import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="bg-gray-100 py-10 px-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">About Our LMS</h1>
        <p className="text-gray-600 mt-4">
          Empowering learners and educators with a state-of-the-art Learning Management System.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Feature 1 */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Feature 1"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800">Interactive Courses</h3>
          <p className="text-gray-600 mt-2">
            Engage in highly interactive courses designed by industry experts.
          </p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Feature 2"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800">Expert Instructors</h3>
          <p className="text-gray-600 mt-2">
            Learn from experienced instructors with a passion for teaching.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Feature 3"
            className="w-32 h-32 object-cover rounded-full mb-4"
          />
          <h3 className="text-xl font-bold text-gray-800">Flexible Learning</h3>
          <p className="text-gray-600 mt-2">
            Learn at your own pace with 24/7 access to all resources.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-blue-50 p-10 mt-16 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Our Mission</h2>
        <p className="text-gray-600 mt-4 text-center">
          Our mission is to make quality education accessible to everyone, everywhere. We aim to
          bridge the gap between learners and knowledge, helping them achieve their goals and unlock
          their full potential.
        </p>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center mt-12">
        <Link
          to="/courses"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded"
        >
          Explore Courses
        </Link>
      </div>
    </div>
  );
};

export default About;
