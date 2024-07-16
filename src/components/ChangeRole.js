import React, { useState, useEffect } from 'react'; // Import necessary hooks from React
import axios from '../services/api'; // Import axios instance for API calls, adjust path based on your project structure
import { useParams, Link } from 'react-router-dom'; // Import useParams for extracting URL parameters and Link for navigation
import { toast } from 'react-toastify'; // Import toast for notifications

const ChangeRole = () => {
  const { userId } = useParams(); // Extract userId from URL parameter
  const [currentRole, setCurrentRole] = useState(''); // State to store the current role of the user
  const [newRole, setNewRole] = useState(''); // State to store the new role selected by the admin
  const [loading, setLoading] = useState(true); // State to handle loading status

  // Hardcoded roles for selection
  const roles = [
    { _id: '1', name: 'Admin' },
    { _id: '2', name: 'Manager' },
    { _id: '3', name: 'Normal' },
  ];

  // Fetch user role when the component mounts
  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve token from local storage
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const response = await axios.get(`/api/users/${userId}`, config); // API call to get user details
        setCurrentRole(response.data.role); // Set current role from the response
      } catch (error) {
        handleRequestError(error, 'Failed to fetch user role'); // Handle errors
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };
    fetchUserRoles();
  }, [userId]);

  // Handle form submission to change user role
  const handleRoleChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.put(`/api/users/${userId}/update-role`, { role: newRole }, config); // API call to update user role
      toast.success('Role changed successfully'); // Show success notification
      setCurrentRole(newRole); // Update the current role in the UI
      localStorage.setItem('success-token', 'hardcoded-success-token'); // Store a success token (for demonstration)
    } catch (error) {
      handleRequestError(error, 'Failed to change role'); // Handle errors
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  // Helper function to handle API request errors
  const handleRequestError = (error, errorMessage) => {
    console.error('API Request Error:', error.message); // Log the error message
    if (error.response) {
      // Server responded with a status code outside of 2xx range
      console.error('Response Data:', error.response.data);
      console.error('Response Status:', error.response.status);
      toast.error(`${errorMessage}: ${error.response.data.message}`); // Show error notification
    } else if (error.request) {
      // Request was made but no response was received
      console.error('No response received:', error.request);
      toast.error('No response from server'); // Show error notification
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error setting up the request:', error.message);
      toast.error('Request setup error'); // Show error notification
    }
    setLoading(false); // Ensure loading state is set to false on error
  };

  // Show loading indicator while fetching user data
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h1 className="text-center">Change User Role</h1>
          <Link to="/dashboard" className="btn btn-primary">
            Back to Dashboard
          </Link>
        </div>
        <div className="card-body">
          <p className="lead text-center">
            Select a new role for the user and submit the form to update their role.
          </p>
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
                    onChange={(e) => setNewRole(e.target.value)} // Update newRole state on change
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
      </div>
    </div>
  );
};

export default ChangeRole;
