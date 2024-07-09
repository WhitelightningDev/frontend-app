import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5 d-flex flex-column align-items-center">
      <h2 className="mb-4">Welcome to Your Application</h2>
      <p className="text-center mb-4">This is the home page for the authentication application either login or register if you dont have an account</p>
      <div className="d-flex justify-content-center">
        <Link to="/login">
          <button className="btn btn-primary mr-2">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-secondary ml-2">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
