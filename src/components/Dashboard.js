import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

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

    if (!role || !username) {
      // Redirect to login if userRole or userName is not defined
      navigate('/login');
    } else {
      // Set user role and name
      setUserRole(role);
      setUserName(username);
      // Fetch data based on user's role
      fetchDataBasedOnRole(role);
    }
  }, [navigate]);

  const fetchDataBasedOnRole = async (role) => {
    try {
      // Fetch all credentials
      const credentialsResponse = await axios.get('http://localhost:3030/api/credentials', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setCredentials(credentialsResponse.data);

      // Fetch all divisions
      const divisionsResponse = await axios.get('http://localhost:3030/api/divisions', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDivisions(divisionsResponse.data);
      

      // Fetch user details for Admin
      if (role === 'Admin') {
        const usersResponse = await axios.get('http://localhost:3030/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
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

            {/* Render Update Credential, View Credentials, Add Credential links for Admin and Manager */}
            {(userRole === 'Admin' || userRole === 'Manager' || userRole === 'Normal') && (
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

            {(userRole === 'Admin' || userRole === 'Manager') && (
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
                    {user.name} - {user.email}
                    {/* Render actions to assign/unassign users and change roles */}
                    <div className="mt-2">
                      <Link to={`/assign-user/${user._id}`} className="btn btn-sm btn-primary me-2">
                        Assign/Unassign User
                      </Link>
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
