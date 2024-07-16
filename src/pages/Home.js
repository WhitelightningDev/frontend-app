import React from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../assets/undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_users_per_minute_1e4q_t22j_-1-_0ngf_-1-_27dv_30ul_legv_-1-_il1l_-2-_0jip.svg'; // Import your image here

const Home = () => {
  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      {/* Application Title */}
      <h2 className="mb-4">Welcome to the autheticator app </h2>

      {/* Application Description */}
      <p className="text-center mb-4">
        This is the home page for the authentication application. Please login or register if you don't have an account.
      </p>

      {/* Image Section */}
      <div className="mb-4">
        <img src={homeImage} alt="Home Illustration" style={{ maxWidth: '100%', maxHeight: '300px' }} />
      </div>

      {/* Login and Register Buttons */}
      <div className="d-flex justify-content-center">
        {/* Login Button */}
        <Link to="/login">
          <button className="btn btn-primary mr-2">Login</button>
        </Link>

        {/* Register Button */}
        <Link to="/register">
          <button className="btn btn-secondary ml-2">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
