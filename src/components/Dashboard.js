import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [users, setUsers] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');

    if (!role || !username || !token) {
      // Redirect to login if userRole, userName, or token is not defined
      navigate('/login');
    } else {
      // Set user role and name
      setUserRole(role);
      setUserName(username);
      // Fetch data based on user's role
      fetchDataBasedOnRole(role, token);
    }
  }, [navigate]);

  const fetchDataBasedOnRole = async (role, token) => {
    try {
      const headers = { 'x-auth-token': token };

      // Fetch all credentials
      const credentialsResponse = await axios.get('http://localhost:3030/api/credentials', { headers });
      setCredentials(credentialsResponse.data);

      // Fetch all divisions
      const divisionsResponse = await axios.get('http://localhost:3030/api/divisions', { headers });
      setDivisions(divisionsResponse.data);

      // Fetch user details for Admin
      if (role === 'Admin') {
        const usersResponse = await axios.get('http://localhost:3030/api/users', { headers });
        setUsers(usersResponse.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Error fetching data.');
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    // Clear localStorage securely
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    onLogout();
    navigate('/login');
    toast.success('Logged out successfully.');
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Dashboard</h1>

      <div className="card shadow mb-3">
        <div className="card-header d-flex justify-content-between align-items-center">
          <div>
            <span>Welcome, {userName}!</span>
            <br />
            <span>Your Role: {userRole}</span>
          </div>
          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {/* Render Manage Roles link for Admin */}
            {userRole === 'Admin' && (
              <li className="list-group-item">
                <Link to="/manage-roles" className="text-decoration-none">
                  Manage Roles
                </Link>
              </li>
            )}

            {/* Render Update Credential, View Credentials, Add Credential links for Admin, Manager, and Normal users */}
            {['Admin', 'Manager', 'Normal'].includes(userRole) && (
              <>
                <li className="list-group-item">
                  <Link to="/view-credentials" className="text-decoration-none">
                    View Credentials
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link to="/add-credential" className="text-decoration-none">
                    Add Credential
                  </Link>
                </li>
              </>
            )}

            {/* Render Update Credential link for Admin and Manager */}
            {['Admin', 'Manager'].includes(userRole) && (
              <li className="list-group-item">
                <Link to="/update-credential" className="text-decoration-none">
                  Update Credential
                </Link>
              </li>
            )}
          </ul>

          {/* Display fetched credentials */}
          {credentials.length > 0 && (
            <div className="mt-4">
              <h2>Credentials</h2>
              <ul className="list-group">
                {credentials.map((credential) => (
                  <li key={credential._id} className="list-group-item">
                    {credential.name} - {credential.username}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display fetched divisions */}
          {divisions.length > 0 && (
            <div className="mt-4">
              <h2>Divisions</h2>
              <ul className="list-group">
                {divisions.map((division) => (
                  <li key={division._id} className="list-group-item">
                    {division.name} - {division.ou.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Display fetched users for Admin */}
          {userRole === 'Admin' && users.length > 0 && (
            <div className="mt-4">
              <h2>Users</h2>
              <ul className="list-group">
                {users.map((user) => (
                  <li key={user._id} className="list-group-item">
                    {user.username} - {user.role}
                    {/* Render actions to assign/unassign users and change roles */}
                    <div className="mt-2">
                      <Link to={`/change-role/${user._id}`} className="btn btn-sm btn-warning">
                        Change Role
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
