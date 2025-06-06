// src/api/auth.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/v1/auth';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + '/register', userData);
  return {
    token: response.data.token,
    user: response.data.user // Access user data from data property
  };
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + '/login', userData);
  console.log('Login successful:', response); // Log the response data
  return {
    token: response.data.token,
    user: response.data.user // Access user data from data property
  };
};

// Get logged in user
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL + '/me', config);
  return {
    user: response.data.data // Access user data from data property
  };
};

const authService = {
  register,
  login,
  getMe
};

export default authService;