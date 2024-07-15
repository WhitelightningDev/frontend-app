import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ChangeRole = () => {
  const { userId } = useParams(); // Extract userId from URL parameter
  const [currentRole, setCurrentRole] = useState('');
  const [newRole, setNewRole] = useState('');
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserRoles();
    fetchAllRoles();
  }, [userId]);

  // Fetch user's current role
  const fetchUserRoles = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`/api/users/${userId}/roles`, config);
      setCurrentRole(response.data.currentRole);
    } catch (error) {
      handleRequestError(error, 'Failed to fetch user roles');
    }
  };

  // Fetch all roles for selection
  const fetchAllRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      setRoles(response.data);
    } catch (error) {
      handleRequestError(error, 'Failed to fetch roles');
    }
  };

  // Handle role change submission
  const handleRoleChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(`/api/users/${userId}/roles`, { newRole }, config);
      toast.success('Role changed successfully');
      setCurrentRole(newRole); // Update current role in UI
    } catch (error) {
      handleRequestError(error, 'Failed to change role');
    } finally {
      setLoading(false);
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

  if (loading) {
    return <p>Loading...</p>; // Optional loading indicator
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Change User Role</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h4>User ID: {userId}</h4>
          <h5>Current Role: {currentRole}</h5>
          <form onSubmit={handleRoleChange}>
            <div className="mb-3">
              <label htmlFor="newRole" className="form-label">Select New Role:</label>
              <select
                id="newRole"
                className="form-select"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                required
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role.name}>{role.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Change Role</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeRole;