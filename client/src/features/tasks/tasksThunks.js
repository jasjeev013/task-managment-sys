import tasksService from '../../api/tasks';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Get all tasks
export const getTasks = createAsyncThunk(
  'tasks/getAll',
  async (filters, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await tasksService.getTasks(token, filters);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get single task
export const getTask = createAsyncThunk(
  'tasks/getOne',
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await tasksService.getTask(taskId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create task
export const createTask = createAsyncThunk(
  'tasks/create',
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const user = thunkAPI.getState().auth.user;
      return await tasksService.createTask({...taskData,
createdBy: user._id
      }, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update task
export const updateTask = createAsyncThunk(
  'tasks/update',
  async ({ taskId, taskData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await tasksService.updateTask(taskId, taskData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete task
export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (taskId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await tasksService.deleteTask(taskId, token);
      return taskId;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Download document
export const downloadDocument = createAsyncThunk(
  'tasks/downloadDocument',
  async ({ taskId, docId }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const response = await tasksService.downloadDocument(taskId, docId, token);
      
      // Create blob link to download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `document-${docId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      
      return { taskId, docId };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);