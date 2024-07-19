import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddCredential = () => {
  const [credential, setCredential] = useState({ title: '', username: '', password: '', division: '', ou: '' });
  const [divisions, setDivisions] = useState([]);
  const [ous, setOus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDivisions();
    fetchOus();
  }, []);

  const fetchDivisions = async () => {
    try {
      const response = await axios.get('/api/divisions');
      setDivisions(response.data);
    } catch (error) {
      console.error('Error fetching divisions:', error.message);
      toast.error('Failed to fetch divisions');
    }
  };

  const fetchOus = async () => {
    try {
      const response = await axios.get('/api/ous');
      setOus(response.data);
    } catch (error) {
      console.error('Error fetching OUs:', error.message);
      toast.error('Failed to fetch OUs');
    }
  };

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/credentials', credential);
      toast.success('Credential added successfully');
      setCredential({ title: '', username: '', password: '', division: '', ou: '' });
    } catch (error) {
      if (error.response) {
        console.error('Error adding credential:', error.response.data);
        toast.error(`Failed to add credential: ${error.response.data.msg}`);
      } else if (error.request) {
        console.error('Error adding credential:', error.request);
        toast.error('Failed to add credential: No response received from server');
      } else {
        console.error('Error adding credential:', error.message);
        toast.error('Failed to add credential: Request setup failed');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Add Credential</h1>
      <p className="lead text-center">
        Fill out the form below to add a new credential. Once added, you can view and manage all credentials from the dashboard.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={credential.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" id="username" name="username" value={credential.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="division">Division</label>
          <select className="form-control" id="division" name="division" value={credential.division} onChange={handleChange} required>
            <option value="">Select Division</option>
            {divisions.map((division) => (
              <option key={division._id} value={division._id}>{division.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="ou">Organizational Unit</label>
          <select className="form-control" id="ou" name="ou" value={credential.ou} onChange={handleChange} required>
            <option value="">Select OU</option>
            {ous.map((ou) => (
              <option key={ou._id} value={ou._id}>{ou.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary btn-block">Add Credential</button>
        <button type="button" className="btn btn-secondary btn-block mt-3" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </form>
    </div>
  );
};

export default AddCredential;
