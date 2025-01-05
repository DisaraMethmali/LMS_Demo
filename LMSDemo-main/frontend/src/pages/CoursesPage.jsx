import React, { useState, useEffect } from 'react';
import CourseList from '../components/CourseList';
import CourseForm from '../components/CourseForm';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const { user } = useAuth();
  const isAdminUser = user?.role === 'admin';
  const [editingCourse, setEditingCourse] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle form visibility

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to fetch courses', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };

    const fetchEnrolledCourses = async () => {
      try {
        const response = await api.get('/enrollments');
        setEnrolledCourses(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to fetch enrolled courses', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };

    fetchCourses();
    if (!isAdminUser) {
      fetchEnrolledCourses();
    }
  }, [isAdminUser]);

  const handleCreateCourse = async (data) => {
    try {
      if (editingCourse) {
        const response = await api.put(`/courses/${editingCourse.id}`, data);
        setCourses(
          courses.map((course) => (course.id === editingCourse.id ? response.data : course))
        );
        toast.success('Successfully updated course', {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        const response = await api.post('/courses', data);
        setCourses([...courses, response.data]);
        toast.success('Successfully added course', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setEditingCourse(null);
      setIsFormVisible(false); // Hide the form after submission
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add course', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setIsFormVisible(true); // Show form for editing
  };

  return (
    <div className="flex">
      {/* Courses Section */}
      <div className="container mx-auto mt-8">
        {isAdminUser && (
          <div className="mb-4">
            <button
              onClick={() => {
                setEditingCourse(null); // Reset editing
                setIsFormVisible(!isFormVisible); // Toggle form visibility
              }}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              {isFormVisible ? 'Cancel' : 'Add Course'}
            </button>
          </div>
        )}
        {/* Show the form conditionally */}
        {isAdminUser && isFormVisible && (
          <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-100">
            <CourseForm onSubmit={handleCreateCourse} editingCourse={editingCourse} />
          </div>
        )}
        {/* Render the CourseList once */}
        <div className="flex flex-wrap gap-4">
          <CourseList
            courses={courses}
            setCourses={setCourses}
            handleEdit={handleEdit}
            enrolledCourses={enrolledCourses}
            setEnrolledCourses={setEnrolledCourses}
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;


