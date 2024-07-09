import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Dashboard</h1>

      <div className="card shadow mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <span>Actions</span>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              <Link to="/manage-roles" className="text-decoration-none">Manage Roles</Link>
            </li>
            <li className="list-group-item">
              <Link to="/update-credential" className="text-decoration-none">Update Credential</Link>
            </li>
            <li className="list-group-item">
              <Link to="/view-credentials" className="text-decoration-none">View Credentials</Link>
            </li>
            <li className="list-group-item">
              <Link to="/add-credential" className="text-decoration-none">Add Credential</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
