import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const ManageRoles = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoles();
  }, []);

  // Function to fetch roles from the server
  const fetchRoles = async () => {
    setLoading(true); // Set loading state to true
    try {
      const response = await axios.get('/api/roles');
      console.log('Response Data:', response.data); // Log response data for debugging
      setRoles(response.data);
      toast.success('Roles fetched successfully');
    } catch (error) {
      handleRequestError(error, 'Failed to fetch roles');
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

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Manage Roles</h1>
      {loading ? (
        <p>Loading...</p> // Optional loading indicator
      ) : (
        <ul className="list-group">
          {roles.map((role) => (
            <li key={role._id} className="list-group-item">
              {role.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageRoles;
