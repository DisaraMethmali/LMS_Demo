import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: '5 Tips for Effective Online Learning',
      description:
        'Discover how to maximize your productivity and engagement while learning online. These tips will help you stay on track and achieve your goals.',
      author: 'John Doe',
      date: 'January 3, 2025',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      title: 'The Future of E-Learning Platforms',
      description:
        'Explore the emerging trends in e-learning and how they are shaping the future of education. AI, gamification, and more!',
      author: 'Jane Smith',
      date: 'February 14, 2025',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 3,
      title: 'How to Choose the Right Course for Your Career',
      description:
        'Learn how to select courses that align with your career goals and skill development needs. Start your journey with confidence.',
      author: 'Emily Johnson',
      date: 'March 10, 2025',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  return (
    <div className="bg-gray-100 py-10 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">Our Blog</h1>
        <p className="text-gray-600 mt-4">
          Stay updated with the latest insights, tips, and trends in e-learning.
        </p>
      </div>

      {/* Blog Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg">
            {/* Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>

            {/* Description */}
            <p className="text-gray-600 mt-2">{post.description}</p>

            {/* Author and Date */}
            <div className="flex items-center justify-between mt-4 text-gray-500 text-sm">
              <p>By {post.author}</p>
              <p>{post.date}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <p className="text-gray-600">Want to contribute to our blog?</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mt-4">
          Write a Blog
        </button>
      </div>
    </div>
  );
};

export default Blog;
