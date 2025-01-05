import React, { useState, useEffect } from 'react';
import api from '../api';  // Assuming api.js is correctly configured to interact with your Flask backend
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Info = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [activeTable, setActiveTable] = useState('students'); // State to toggle between students and enrollments
  const [courseCount, setCourseCount] = useState(0);
  const [studentSearch, setStudentSearch] = useState(''); // State for student search
  const [enrollmentSearch, setEnrollmentSearch] = useState(''); // State for enrollment search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');  // Get the JWT token from localStorage (or sessionStorage)

        if (!token) {
          toast.error('No authorization token found');
          return;
        }

        // Fetch student count
        const studentRes = await api.get('/auth/students/count', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudentCount(studentRes.data.count);

        // Fetch admin count
        const adminRes = await api.get('/auth/admins/count', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAdminCount(adminRes.data.count);

        // Fetch student list (users with role 'student')
        const studentListRes = await api.get('/auth/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStudents(studentListRes.data.users);

        // Fetch course count
        const courseRes = await api.get('/courses/count', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourseCount(courseRes.data.count);

        // Fetch enrollments (user_id, course_id, is_active only)
        const enrollmentListRes = await api.get('/auth/enrollments', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEnrollments(enrollmentListRes.data);

      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  // Filter students based on search query
  const filteredStudents = students.filter(student =>
    student.username.toLowerCase().includes(studentSearch.toLowerCase()) ||
    student.email.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // Filter enrollments based on search query
  const filteredEnrollments = enrollments.filter(enrollment =>
    enrollment.user_id.toString().includes(enrollmentSearch) ||
    enrollment.course_id.toString().includes(enrollmentSearch)
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Info</h1>

      {/* Total Count Boxes */}
      <div className="flex justify-center gap-12 mb-8">
        <div className="bg-blue-100 p-8 rounded-md shadow-md w-64 text-center">
          <h2 className="text-lg font-bold">Total Students</h2>
          <p>{studentCount}</p>
        </div>
        <div className="bg-blue-100 p-8 rounded-md shadow-md w-64 text-center">
          <h2 className="text-lg font-bold">Total Admins</h2>
          <p>{adminCount}</p>
        </div>
        <div className="bg-blue-100 p-8 rounded-md shadow-md w-64 text-center">
          <h2 className="text-lg font-bold">Total Courses</h2>
          <p>{courseCount}</p>
        </div>
      </div>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-8 mb-8">
        <button
          className={`px-4 py-2 rounded-md ${activeTable === 'students' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTable('students')}
        >
          Students
        </button>
        <button
          className={`px-4 py-2 rounded-md ${activeTable === 'enrollments' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTable('enrollments')}
        >
          Enrollments
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center gap-8 mb-8">
        {activeTable === 'students' && (
          <input
            type="text"
            placeholder="Search Students..."
            value={studentSearch}
            onChange={(e) => setStudentSearch(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 w-64"
          />
        )}
        {activeTable === 'enrollments' && (
          <input
            type="text"
            placeholder="Search Enrollments..."
            value={enrollmentSearch}
            onChange={(e) => setEnrollmentSearch(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 w-64"
          />
        )}
      </div>

      {/* Conditional Rendering for Students Table */}
      {activeTable === 'students' && (
        <>
          <h2 className="text-xl font-bold mb-4">Student List</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="col" className="px-6 py-4 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-600 text-center">Student ID</th>
                  <th scope="col" className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-600 text-center">Username</th>
                  <th scope="col" className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-600 text-center">Email</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={student.id}>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{student.id}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{student.username}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{student.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="border border-gray-400 px-4 py-2 text-center">No students found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Conditional Rendering for Enrollments Table */}
      {activeTable === 'enrollments' && (
        <>
          <h2 className="text-xl font-bold mb-4">Enrollments List</h2>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="col" className="px-6 py-4 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-600 text-center">Student ID</th>
                  <th scope="row" className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">Course ID</th>
                  <th scope="row" className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.length > 0 ? (
                  filteredEnrollments.map((enrollment) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={enrollment.id}>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{enrollment.user_id}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">{enrollment.course_id}</td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                        {enrollment.is_active ? 'Active' : 'Inactive'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="border border-gray-400 px-4 py-2 text-center">No enrollments found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Info;




