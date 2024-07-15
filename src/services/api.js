import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to decode JWT token and check expiration
const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Failed to decode token:', error.message);
    return null;
  }
};

// Function to check if token is about to expire
const isTokenExpiringSoon = (exp, bufferTime = 30 * 60 * 1000) => {
  // Buffer time is in milliseconds; default is 30 minutes (30 * 60 * 1000 ms)
  const nowInSeconds = Date.now() / 1000;
  return exp - nowInSeconds < bufferTime / 1000;
};

let isRefreshing = false;
let refreshSubscribers = [];

// Add a response interceptor to refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration error
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          // Wait for token refresh
          const token = await new Promise((resolve) => {
            refreshSubscribers.push((newToken) => resolve(newToken));
          });

          originalRequest.headers['x-auth-token'] = token;
          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token stored');
        }

        const decodedToken = decodeToken(token);
        if (!decodedToken) {
          throw new Error('Failed to decode token');
        }

        // Simulate token refresh request (replace with your actual endpoint)
        const refreshResponse = await axios.post('/auth/refresh-token', {
          refreshToken: localStorage.getItem('refreshToken'),
        });

        const { refreshedToken } = refreshResponse.data;

        // Update localStorage with the refreshed token
        localStorage.setItem('token', refreshedToken);

        // Set the refreshed token in the request headers
        originalRequest.headers['x-auth-token'] = refreshedToken;

        // Process all pending requests
        refreshSubscribers.forEach((callback) => callback(refreshedToken));
        refreshSubscribers = [];

        return api(originalRequest);
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError.message);
        // Handle token refresh failure
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Redirect to login page
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
