// src/services/api.js
import api from '@/utils/axios';

// REGISTER
export const registerUser = async ({ name, email, password, role }) => {
  const res = await api.post('/auth/register', { name, email, password, role });
  return res.data;
};

// LOGIN
export const loginUser = async ({ email, password }) => {
  const res = await api.post('/auth/login', { email, password });
  return res.data;
};

// LOGOUT
export const logoutUser = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

// GET CURRENT USER PROFILE
export const getProfile = async () => {
  const res = await api.get('/auth/profile');
  return res.data;
};
