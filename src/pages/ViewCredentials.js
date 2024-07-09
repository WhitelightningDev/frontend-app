import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const ViewCredentials = () => {
  const [credentials, setCredentials] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const response = await axios.get('/api/credentials', config);
        setCredentials(response.data);
      } catch (error) {
        console.error('Error fetching credentials:', error.response?.data?.msg || error.message);
        setError('Error fetching credentials. Please try again later.');
      }
    };

    fetchCredentials();
  }, []);

  return (
    <div className="container mt-5">
      <h2>View Credentials</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="list-group">
        {credentials.map((cred) => (
          <li key={cred._id} className="list-group-item">
            <strong>Title:</strong> {cred.title}<br />
            <strong>Username:</strong> {cred.username}<br />
            <strong>Password:</strong> {cred.password}<br />
            <strong>Division:</strong> {cred.division.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCredentials;
