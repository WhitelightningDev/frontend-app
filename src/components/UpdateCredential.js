import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCredential = () => {
  const [credentials, setCredentials] = useState([]);
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [divisions, setDivisions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchCredentials();
    fetchDivisions();
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

  const fetchDivisions = async () => {
    try {
      const response = await axios.get('/api/divisions');
      setDivisions(response.data);
    } catch (error) {
      console.error('Error fetching divisions:', error.message);
      toast.error('Failed to fetch divisions');
    }
  };

  const handleSelectCredential = (credential) => {
    setSelectedCredential({
      ...credential,
      division: credential.division?._id || '', // Safely access division ID
    });
  };

  const handleChange = (e) => {
    setSelectedCredential({ ...selectedCredential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/credentials/${selectedCredential._id}`, selectedCredential);
      toast.success('Credential updated successfully');
      fetchCredentials(); // Refresh credentials list after update
      setSelectedCredential(null);
    } catch (error) {
      console.error('Error updating credential:', error.message);
      toast.error('Failed to update credential');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Update Credentials</h1>
      <ul className="list-group">
        {credentials.map((credential) => (
          <li key={credential._id} className="list-group-item">
            <h5>{credential.title}</h5>
            <p>Username: {credential.username}</p>
            <p>Division: {credential.division?.name || 'No Division'}</p> {/* Safely access division name */}
            <button
              className="btn btn-primary"
              onClick={() => handleSelectCredential(credential)}
            >
              Update
            </button>
          </li>
        ))}
      </ul>

      {selectedCredential && (
        <div className="card mt-3">
          <h5 className="card-header text-center">Update Credential</h5>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  value={selectedCredential.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={selectedCredential.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={selectedCredential.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="division">Division</label>
                <select
                  className="form-control"
                  id="division"
                  name="division"
                  value={selectedCredential.division}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Division</option>
                  {divisions.map((division) => (
                    <option key={division._id} value={division._id}>
                      {division.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Update Credential</button>
            </form>
          </div>
        </div>
      )}

      <button className="btn btn-secondary mt-3" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default UpdateCredential;
