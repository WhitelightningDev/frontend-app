import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

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
      <h1 className="mb-4 text-center">View Credentials</h1>
      <ul className="list-group">
        {credentials.map((credential) => (
          <li key={credential._id} className="list-group-item">
            <h5>{credential.title}</h5>
            <p>Username: {credential.username}</p>
            <p>Division: {credential.division?.name || 'No Division'}</p> {/* Safely access division name */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCredentials;
