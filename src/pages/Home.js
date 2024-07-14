import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      {/* Application Title */}
      <h2 className="mb-4">Welcome to Your Application</h2>

      {/* Application Description */}
      <p className="text-center mb-4">
        This is the home page for the authentication application. Please login or register if you don't have an account.
      </p>

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
