import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true
});

export default api;

export const registerUser = async (userData) => {
  return api.post(`/auth/register`, userData);
};

export const loginUser = async (userData) => {
  return api.post(`/auth/login`, userData);
};
