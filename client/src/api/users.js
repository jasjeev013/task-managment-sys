// src/api/users.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/v1/users';

// Get all users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL, config);
  return response.data; // Return data array directly
};

// Get single user
const getUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL + '/' + userId, config);
  return response.data; // Return user object directly
};

// Create user
const createUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  console.log('Creating user with data:', userData); // Log user data for debugging
  const response = await axios.post(API_URL, userData, config);
  return response.data; // Return created user directly
};

// Update user
const updateUser = async (userId, userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.put(API_URL + '/' + userId, userData, config);
  return response.data; // Return updated user directly
};

// Delete user
const deleteUser = async (userId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  await axios.delete(API_URL + '/' + userId, config);
  return userId; // Return the deleted user ID
};

const usersService = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};

export default usersService;