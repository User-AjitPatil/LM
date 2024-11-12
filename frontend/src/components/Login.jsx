import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the API request for login
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      // Check if login is successful based on the response
      if (response.status === 200) {
        alert('Login successful!');
        navigate('/library'); // Redirect to the library page after login
      } else {
        setError('Login failed, please check your credentials.');
      }
    } catch (error) {
      // Handle errors such as incorrect credentials or network issues
      console.error('Error during login:', error);
      setError('Login failed, please check your credentials.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-slate-700 shadow-md rounded-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 bg-transparent block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
