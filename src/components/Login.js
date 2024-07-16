import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../services/api';
import { toast } from 'react-toastify';
import logoSVG from '../assets/undraw_secure_login_pdn4.svg'; // Import your SVG file here

const Login = ({ onLogin }) => {
  // State to manage the credentials input by the user
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  // State to manage the loading status of the login request
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    // Update the credentials state with the new input value
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setLoading(true); // Set loading state to true
    try {
      // Send login request
      const response = await axios.post('/api/auth/login', credentials);
      const { token, role, username } = response.data;

      // Log the response data for debugging
      console.log('Response:', response.data);

      // Validate the response data
      if (!token || !role || !username) {
        throw new Error('Invalid response data');
      }

      // Store data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('username', username);

      // Update the parent component state
      onLogin(role, username);

      // Navigate to the dashboard
      navigate('/dashboard');

      // Show success message
      toast.success(`Login successful! Welcome, ${username}`);
    } catch (error) {
      setLoading(false); // Set loading state to false
      console.error('Login error:', error);

      // Show error message based on the error response
      if (error.response && error.response.data) {
        toast.error(error.response.data.msg || 'Login failed. Please try again.');
      } else if (error.message) {
        toast.error(`Login failed. ${error.message}`);
      } else {
        toast.error('Login failed. An error occurred.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {/* SVG Logo */}
              <div className="text-center mb-4">
                <img src={logoSVG} alt="Logo" style={{ maxWidth: '100%', maxHeight: '150px' }} />
              </div>

              {/* Login Form */}
              <h2 className="card-title text-center mb-4">Login</h2>
              <form onSubmit={handleSubmit}>
                {/* Username Input */}
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={credentials.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Password Input */}
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                {/* Submit Button */}
                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>

              {/* Register Button */}
              <div className="text-center mt-3">
                <Link to="/register" className="btn btn-link">Register</Link>
              </div>

              {/* Back to Home Button */}
              <div className="text-center mt-3">
                <Link to="/" className="btn btn-link">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
