import React, { useEffect, useState } from 'react'; // Import necessary hooks from React
import axios from '../services/api'; // Import axios instance for API calls
import { toast } from 'react-toastify'; // Import toast for notifications
import { Link } from 'react-router-dom'; // Import Link for navigation
import logoImage from '../assets/undraw_website_u6x8.svg'; // Import your image file here

const ViewCredentials = () => {
  // Define state for storing credentials
  const [credentials, setCredentials] = useState([]);

  // useEffect hook to fetch credentials when the component mounts
  useEffect(() => {
    fetchCredentials();
  }, []);

  // Function to fetch credentials from the API
  const fetchCredentials = async () => {
    try {
      const response = await axios.get('/api/credentials'); // API call to get credentials
      setCredentials(response.data); // Set the credentials state with the fetched data
    } catch (error) {
      console.error('Error fetching credentials:', error.message); // Log the error
      toast.error('Failed to fetch credentials'); // Show error notification
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">View Credentials</h1>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>

      {/* Image section */}
      <div className="text-center mb-4">
        <img src={logoImage} alt="Logo" style={{ maxWidth: '100%', maxHeight: '150px' }} />
      </div>

      <p className="lead text-center">
        Below are the credentials currently stored in the system. You can view all credentials associated with different divisions.
      </p>
      
      {credentials.length > 0 ? (
        // List of credentials
        <ul className="list-group">
          {credentials.map((credential) => (
            <li key={credential._id} className="list-group-item">
              <h5>{credential.title}</h5>
              <p>Username: {credential.username}</p>
              <p>Division: {credential.division?.name || 'No Division'}</p> {/* Safely access division name */}
            </li>
          ))}
        </ul>
      ) : (
        // Message when no credentials are found
        <p className="text-center mt-4">No credentials found.</p>
      )}
    </div>
  );
};

export default ViewCredentials;
