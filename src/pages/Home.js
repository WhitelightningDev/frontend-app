import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <h2>Welcome to Your Application</h2>
      <p>This is the home page of your application.</p>
      <div>
        <Link to="/login">
          <button className="btn btn-primary mr-2">Login</button>
        </Link>
        <Link to="/register">
          <button className="btn btn-secondary">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
