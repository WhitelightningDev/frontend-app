import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const UpdateCredential = () => {
  const [credentials, setCredentials] = useState([]);
  const [selectedCredential, setSelectedCredential] = useState('');
  const [newData, setNewData] = useState({});

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

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.put(`/api/credentials/${selectedCredential}`, newData, config);
      toast.success('Credential updated successfully!');
    } catch (error) {
      console.error('Error updating credential:', error.response.data.msg);
      toast.error('Error updating credential.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Credential</h2>
      <div className="form-group">
        <label htmlFor="credential">Credential</label>
        <select id="credential" className="form-control" value={selectedCredential} onChange={(e) => setSelectedCredential(e.target.value)}>
          {credentials.map((cred) => (
            <option key={cred._id} value={cred._id}>{cred.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="newData">New Data</label>
        <input
          type="text"
          className="form-control"
          id="newData"
          value={newData.data}
          onChange={(e) => setNewData({ ...newData, data: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default UpdateCredential;
