import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800">
      <h1 className="text-3xl font-bold text-white mb-8">Welcome to Library Management System</h1>
      <div className="space-y-4 space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="w-40 bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="w-40 bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Home ;