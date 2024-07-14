import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;

      // Check if token is about to expire (e.g., within 30 seconds)
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      const nowInSeconds = Math.floor(Date.now() / 1000);
      if (decodedToken.exp - nowInSeconds < 30) {
        // Token is about to expire, consider refreshing it
        try {
          const response = await api.post('/auth/refresh-token');
          const { refreshedToken } = response.data;

          // Update localStorage with the refreshed token
          localStorage.setItem('token', refreshedToken);

          // Set the refreshed token in the request headers
          config.headers['x-auth-token'] = refreshedToken;
        } catch (error) {
          console.error('Failed to refresh token:', error.message);
          // Handle token refresh failure (e.g., redirect to login)
          // Example: logout user or redirect to login page
          // You can implement your logic here based on your application flow
          // For simplicity, here we remove the token from localStorage and redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login'; // Redirect to login page
          return Promise.reject(error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;