import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Dashboard</h1>

      <div className="card mb-3">
        <div className="card-header">
          Actions
          <button className="btn btn-danger btn-sm float-end" onClick={handleLogout}>Logout</button>
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
