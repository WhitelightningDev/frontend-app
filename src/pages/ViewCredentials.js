import React, { useState, useEffect } from 'react';
import axios from '../services/api';

const ViewCredentials = () => {
  const [credentials, setCredentials] = useState([]);

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
        console.error('Error fetching credentials:', error.response.data.msg);
      }
    };

    fetchCredentials();
  }, []);

  return (
    <div className="container mt-5">
      <h2>View Credentials</h2>
      <ul className="list-group">
        {credentials.map((cred) => (
          <li key={cred._id} className="list-group-item">
            {cred.name}: {cred.data}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewCredentials;
