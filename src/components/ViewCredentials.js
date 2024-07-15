import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const ViewCredentials = () => {
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const response = await axios.get('/api/credentials');
      setCredentials(response.data);
    } catch (error) {
      console.error('Error fetching credentials:', error.message);
      toast.error('Failed to fetch credentials');
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
      <p className="lead text-center">
        Below are the credentials currently stored in the system. You can view all credentials associated with different divisions.
      </p>
      {credentials.length > 0 ? (
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
        <p className="text-center mt-4">No credentials found.</p>
      )}
    </div>
  );
};

export default ViewCredentials;
