import axios from 'axios';
import auth from './auth';

import useAuth from '../store/auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem('access-token');
    config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let retries = 0;
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (!originalRequest._retry && error.response && error.response.status === 401 && retries < 3) {
      originalRequest._retry = true;
      retries++;

      const authStore = useAuth();
      const { accessToken } = await auth.refreshAccessToken({ refresh_token: authStore.refreshToken });
      authStore.accessToken = accessToken;
      window.localStorage.setItem('access-token', accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      return axiosInstance(originalRequest);
    }

    retries = 0;
    return Promise.reject(error);
  }
);

export default axiosInstance;
