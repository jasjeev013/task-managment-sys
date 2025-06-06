import authService from '../../api/auth';
import { createAsyncThunk } from '@reduxjs/toolkit';

// Save auth data to localStorage
const persistAuthData = (token, user) => {
  localStorage.setItem('authToken', token);
  localStorage.setItem('authUser', JSON.stringify(user));
};

// Clear auth data from localStorage
const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('authUser');
};

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      persistAuthData(response.token, response.user);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Registration failed'
      );
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.login(userData);
      persistAuthData(response.token, response.user);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Login failed'
      );
    }
  }
);

export const getMe = createAsyncThunk(
  'auth/getMe',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { token } = getState().auth;
      if (!token) return rejectWithValue('No token found');
      
      const response = await authService.getMe(token);
      persistAuthData(token, response.user);
      return response;
    } catch (error) {
      clearAuthData();
      return rejectWithValue(
        error.response?.data?.error || error.message || 'Failed to fetch user data'
      );
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    clearAuthData();
  }
);