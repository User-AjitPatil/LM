import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  // Single state for all user data
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('User Data:', userData);
      // Sending user data to backend
      await axios.post('http://localhost:5000/api/signup', userData);
      // Clear the form data after successful signup
      setUserData({ name: '', email: '', password: '' });
      // Display success message and navigate
      alert('Signup successful!');
      navigate('/library');
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  // Update userData state dynamically
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value, // Dynamically update the fields
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-slate-700 shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={handleChange}
              required
              className="mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              required
              className="mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              value={userData.password}
              onChange={handleChange}
              required
              className="mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
