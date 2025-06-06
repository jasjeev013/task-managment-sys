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

// Create task with file upload support
const createTask = async (taskData, token) => {
  // Create FormData object for file uploads
  const formData = new FormData();
  
  // Append all task data fields to formData
  Object.keys(taskData).forEach(key => {
    if (key === 'documents' && taskData[key]) {
      // Handle multiple file uploads
      Array.from(taskData[key]).forEach(file => {
        formData.append('documents', file);
      });
    } else if (taskData[key] !== undefined && taskData[key] !== null) {
      formData.append(key, taskData[key]);
    }
  });

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  };

  try {
    const response = await axios.post(API_URL, formData, config);
    return {
      success: true,
      data: response.data.data  // Matching backend response structure
    };
  } catch (error) {
    // Handle error response matching backend structure
    if (error.response) {
      throw {
        success: false,
        error: error.response.data.error || 'Failed to create task',
        status: error.response.status
      };
    } else {
      throw {
        success: false,
        error: error.message || 'Failed to create task'
      };
    }
  }
};

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