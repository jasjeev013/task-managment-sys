// src/utils/auth.js
export const clearPersistedState = () => {
  try {
    localStorage.removeItem('reduxState');
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
  } catch (err) {
    console.error('Failed to clear persisted state', err);
  }
};