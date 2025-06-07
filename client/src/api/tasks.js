// src/api/tasks.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL + '/api/v1/tasks';

// Get all tasks
const getTasks = async (token, filters = {}) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: filters
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get single task
const getTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.get(API_URL + '/' + taskId, config);
  return response.data;
};


// Create task
const createTask = async (taskData, token) => {
  console.log('Creating task with data:', taskData);  
 
//   // Convert files to Base64
//   const documents = await Promise.all(
//     taskData.documents?.map(file => toBase64(file)) || []
//   );
// console.log('Converted documents to Base64:', documents);
//   const payload = {
//     ...taskData,
//     documents, // Now an array of Base64 strings
//   };

// console.log('Payload for task creation:', payload);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  try {
    console.log('Sending request to create task...');
    const response = await axios.post(API_URL, taskData, config);
    console.log('Task created successfully:', response);
    return { success: true, data: response.data };
  } catch (error) {
    throw {
      success: false,
      error: error.response?.data?.error || 'Failed to create task',
      status: error.response?.status,
    };
  }
};

// Helper: Convert File to Base64
const toBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result.split(',')[1]); // Remove data: prefix
  reader.onerror = (error) => reject(error);
});

// Update task
const updateTask = async (taskId, taskData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  };
  const response = await axios.put(API_URL + '/' + taskId, taskData, config);
  return response.data;
};

// Delete task
const deleteTask = async (taskId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  const response = await axios.delete(API_URL + '/' + taskId, config);
  return response.data;
};

// Download document
const downloadDocument = async (taskId, docId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
    responseType: 'blob'
  };
  const response = await axios.get(
    `${API_URL}/${taskId}/documents/${docId}`,
    config
  );
  return response;
};

const tasksService = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  downloadDocument
};

export default tasksService;