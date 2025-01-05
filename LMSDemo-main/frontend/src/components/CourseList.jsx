import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const CourseList = ({ courses, setCourses, enrolledCourses, setEnrolledCourses }) => {
  const { user } = useAuth();
  const isAdminUser = user?.role === 'admin';

  // State for search input
  const [searchTerm, setSearchTerm] = useState('');
  const [showEnrolledCourses, setShowEnrolledCourses] = useState(false); // State to toggle enrolled courses view

  // Filtered courses based on the search term and showEnrolledCourses flag
  const filteredCourses = courses.filter(
    (course) =>
      (course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (!showEnrolledCourses || enrolledCourses.find((enrolledCourse) => enrolledCourse.id === course.id))
  );

  const handleDelete = async (courseId) => {
    try {
      await api.delete(`/courses/${courseId}`);
      // Directly update courses without refetching
      setCourses(courses.filter((course) => course.id !== courseId));
      toast.success('Successfully deleted course', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete course', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      await api.post(`/enrollments/${courseId}`);
      // Update enrolled courses state without refetching all courses
      if (setEnrolledCourses) {
        setEnrolledCourses([...enrolledCourses, { id: courseId }]);
      }
      toast.success('Successfully enrolled in the course', {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to enroll in the course', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Courses</h2>
      
      {/* Search Input */}
      <div className="mb-6 text-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search courses..."
          className="p-2 border border-gray-300 rounded-lg w-1/2"
        />
      </div>

      {/* Toggle for Enrolled Courses */}
      {!isAdminUser && (
        <div className="text-center mb-6">
          <label className="mr-2">Show Enrolled Courses</label>
          <input
            type="checkbox"
            checked={showEnrolledCourses}
            onChange={() => setShowEnrolledCourses(!showEnrolledCourses)}
          />
        </div>
      )}

      {/* Course List */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <li
              key={course.id}
              className="bg-white p-6 rounded-lg shadow-lg border-l-4 border-blue-500 flex flex-col justify-between min-h-[250px] hover:shadow-xl transition-shadow"
            >
              {/* Course Info */}
              <div>
                <h3 className="text-xl font-semibold mb-2 text-blue-600">
                  <Link to={`/courses/${course.id}`} className="hover:underline">
                    {course.subject}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Course ID:</span> {course.id}
                </p>
                <p className="text-gray-600 mb-2">{course.description}</p>
                <p className="text-gray-600 mb-4">
                  <span className="font-medium">Instructor ID:</span> {course.instructor_id}
                </p>
              </div>

              {/* Enroll or Enrolled button */}
              {!isAdminUser && enrolledCourses && !enrolledCourses.find((enrollCourse) => enrollCourse.id === course.id) ? (
                <button
                  onClick={() => handleEnroll(course.id)}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Enroll
                </button>
              ) : (
                !isAdminUser && (
                  <button
                    disabled
                    className="bg-gray-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Enrolled
                  </button>
                )
              )}

              {/* Admin Delete Button */}
              {isAdminUser && (
                <button
                  onClick={() => handleDelete(course.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
                >
                  Delete
                </button>
              )}
            </li>
          ))
        ) : (
          <li className="col-span-3 text-center text-gray-600">No courses found</li>
        )}
      </ul>
    </div>
  );
};

export default CourseList;



