import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for navigation
import axios from '../services/api';
import { toast } from 'react-toastify';

const Register = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  // Function to handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make POST request to create new user
      await axios.post('/api/users', user);
      // Navigate to login page after successful registration
      navigate('/login');
      // Show success message
      toast.success('Registration successful!');
    } catch (error) {
      // Show error message on registration failure
      toast.error('Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={user.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
              </form>
              <div className="mt-3 text-center">
                {/* Back to Home button */}
                <Link to="/" className="btn btn-link">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
