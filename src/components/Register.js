import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/api';
import { toast } from 'react-toastify';

// Import your image from the assets folder
import registrationImage from '../assets/undraw_undraw_undraw_undraw_sign_up_ln1s_-1-_s4bc_-1-_ee41_-1-_kf4d.svg';

const Register = () => {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/users', user);
      navigate('/login');
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      {/* Card for registration */}
      <div className="card shadow">
        <div className="card-body">
          {/* Image section */}
          <div className="text-center mb-4">
            {/* Use the imported image with custom styling */}
            <img src={registrationImage} alt="Registration Image" className="img-fluid" style={{ maxWidth: '200px' }} />
          </div>

          {/* Registration form */}
          <h1 className="mb-4 text-center">Register</h1>
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
        </div>
      </div>
    </div>
  );
};

export default Register;
