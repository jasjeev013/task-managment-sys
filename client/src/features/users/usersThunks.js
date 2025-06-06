// src/features/users/usersThunks.js
import usersService from '../../api/users';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUsers = createAsyncThunk(
  'users/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await usersService.getUsers(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'Failed to fetch users'
      );
    }
  }
);

export const getUser = createAsyncThunk(
  'users/getOne',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await usersService.getUser(userId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'Failed to fetch user'
      );
    }
  }
);

export const createUser = createAsyncThunk(
  'users/create',
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await usersService.createUser(userData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'Failed to create user'
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/update',
  async ({ userId, userData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await usersService.updateUser(userId, userData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'Failed to update user'
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (userId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await usersService.deleteUser(userId, token);
      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || 'Failed to delete user'
      );
    }
  }
);