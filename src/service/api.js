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
    const tokenExpired =
      error.message === 'Request failed with status code 400' ||
      error.message === 'The access token expired' ||
      error.response.data.message === 'Request failed with status code 401' ||
      error.response.status === 400 ||
      error.status === 401;

    const originalRequest = error.config;
    if (!originalRequest._retry && tokenExpired && retries < 3) {
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
