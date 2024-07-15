import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const ManageRoles = () => {
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRolesAndUsers();
  }, []);

  // Function to fetch roles and users from the server
  const fetchRolesAndUsers = async () => {
    setLoading(true); // Set loading state to true
    try {
      const token = localStorage.getItem('token');
      const headers = { 'x-auth-token': token };

      // Fetch roles
      const rolesResponse = await axios.get('/api/roles', { headers });
      console.log('Roles Response Data:', rolesResponse.data); // Log response data for debugging
      setRoles(rolesResponse.data);

      // Fetch users
      const usersResponse = await axios.get('/api/users', { headers });
      console.log('Users Response Data:', usersResponse.data); // Log response data for debugging
      setUsers(usersResponse.data);

      toast.success('Roles and users fetched successfully');
    } catch (error) {
      handleRequestError(error, 'Failed to fetch roles and users');
    } finally {
      setLoading(false); // Set loading state to false after request completes
    }
  };

  // Helper function to handle request errors
  const handleRequestError = (error, errorMessage) => {
    console.error('API Request Error:', error.message);
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
      toast.error(`${errorMessage}: ${error.response.data.message}`);
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response received:', error.request);
      toast.error('No response from server');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error setting up the request:', error.message);
      toast.error('Request setup error');
    }
  };

  // Function to handle role change
  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'x-auth-token': token };

      await axios.put(`/api/users/${userId}/roles`, { newRole }, { headers });
      toast.success('Role changed successfully');
      fetchRolesAndUsers(); // Refresh the roles and users list after change
    } catch (error) {
      handleRequestError(error, 'Failed to change role');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Manage Roles</h1>
      {loading ? (
        <p>Loading...</p> // Optional loading indicator
      ) : (
        <>
          <h2>Roles</h2>
          <ul className="list-group mb-4">
            {roles.map((role) => (
              <li key={role._id} className="list-group-item">
                {role.name}
              </li>
            ))}
          </ul>

          <h2>Users</h2>
          <ul className="list-group">
            {users.map((user) => (
              <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  {user.username} - Current Role: {user.role}
                </div>
                <div>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="form-select form-select-sm"
                  >
                    <option value="">Select New Role</option>
                    {roles.map((role) => (
                      <option key={role._id} value={role.name}>{role.name}</option>
                    ))}
                  </select>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ManageRoles;
