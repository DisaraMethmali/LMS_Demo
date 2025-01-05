import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await api.get(`/courses/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to fetch the course details", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    };
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div className="container mx-auto mt-8-[800px]">Loading Course Details...</div>;
  }

  // Manually added lectures and tutorials
  const staticLectures = ['Lecture 1', 'Lecture 2', 'Lecture 3'];
  const staticTutorials = ['Tutorial 1', 'Tutorial 2', 'Tutorial 3'];

  return (
    <div className="container mx-auto mt-8w w-[1000px]" style={{ marginLeft: '200px' }}>
      <h2 className="text-2xl font-bold  mt-5 mb-7">{course.subject}</h2>

      {/* Course Details Section */}
      <div className="bg-white p-6 rounded shadow-md mb-25 w-[1000px]"style={{ backgroundColor: '#FFF3E0' }}>
        <p className="text-gray-1000 text-lg">{course.description}</p>
      </div>

      {/* Course Content Section with light orange background */}
      <div className="w-full mt-8 w-[1000px]" style={{ backgroundColor: '#FFF3E0' }}>
      <h4 
  className="text-3xl font-bold  mt-4 mb-6 "
  style={{ letterSpacing: '0px' ,marginLeft: '400px'}}
>
  Course Content
</h4>



        {/* Lectures Section */}
        <div className="mt-2">
          <h5 className="text-2xl font-bold  mt-5 mb-7  "style={{marginLeft: '100px'}}>Lectures</h5>
          <div className="flex justify-center flex-wrap gap-4 mt-2">
  {staticLectures.map((lecture, index) => (
    <button
      key={index}
      className="bg-blue-800 text-white px-4 py-2 rounded focus:outline-none w-[700px] h-[50px]"
    >
      {lecture}
    </button>
  ))}
</div>

        </div>

        {/* Tutorials Section */}
        <div className="mt-4">
          <h5 className="text-2xl font-bold  mt-5 mb-7"style={{marginLeft: '100px'}}>Tutorials</h5>
          <div className="flex justify-center flex-wrap gap-4 mt-2">
            {staticTutorials.map((tutorial, index) => (
              <button
                key={index}
                 className="bg-blue-800 text-white px-4 py-2 rounded focus:outline-none w-[700px] h-[50px]"
              >
                {tutorial}
              </button>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default CourseDetailsPage;

