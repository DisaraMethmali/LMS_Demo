import React, { useState } from 'react';

const CourseForm = ({ onSubmit, editingCourse }) => {
    const [subject, setSubject] = useState(editingCourse ? editingCourse.subject : '');
    const [description, setDescription] = useState(editingCourse ? editingCourse.description : '');
    const [instructorId, setInstructorId] = useState(editingCourse ? editingCourse.instructor_id : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ subject, description, instructor_id: parseInt(instructorId) });
        setSubject('');
        setDescription('');
        setInstructorId('');
    };


    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-6">
                {editingCourse ? 'Edit Course' : 'Create Course'}
            </h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Subject
                </label>
                <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                </label>
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Instructor ID
                </label>
                <input
                    type="number"
                    placeholder="Instructor ID"
                    value={instructorId}
                    onChange={(e) => setInstructorId(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                {editingCourse ? 'Update Course' : 'Create Course'}
            </button>
        </form>
    );
};

export default CourseForm;