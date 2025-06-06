// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import tasksReducer from '../features/tasks/tasksSlice';
import usersReducer from '../features/users/usersSlice';

// Define which reducers to persist
const reducersToPersist = ['auth', 'tasks', 'users'];

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    const state = JSON.parse(serializedState);
    // Only load the persisted reducers
    const persistedState = {};
    reducersToPersist.forEach(reducer => {
      if (state[reducer]) {
        persistedState[reducer] = state[reducer];
      }
    });
    return persistedState;
  } catch (err) {
    console.error('Failed to load state from localStorage', err);
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const stateToPersist = {};
    reducersToPersist.forEach(reducer => {
      if (state[reducer]) {
        stateToPersist[reducer] = state[reducer];
      }
    });
    const serializedState = JSON.stringify(stateToPersist);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Failed to save state to localStorage', err);
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: tasksReducer,
  users: usersReducer
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;