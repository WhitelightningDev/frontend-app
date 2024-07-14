import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCredential = () => {
  const [credential, setCredential] = useState({ title: '', username: '', password: '', division: '' });
  const [divisions, setDivisions] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams(); // Ensure id is correctly extracted from URL

  useEffect(() => {
    if (id) {
      fetchCredential();
    }
    fetchDivisions();
  }, [id]); // Trigger fetch functions when id changes

  const fetchCredential = async () => {
    try {
      const response = await axios.get(`/api/credentials/${id}`);
      setCredential({
        title: response.data.title,
        username: response.data.username,
        password: response.data.password,
        division: response.data.division._id,
      });
    } catch (error) {
      console.error('Error fetching credential:', error.message);
      toast.error('Failed to fetch credential');
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

  const handleChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/credentials/${id}`, credential);
      toast.success('Credential updated successfully');
      navigate('/view-credentials');
    } catch (error) {
      console.error('Error updating credential:', error.message);
      toast.error('Failed to update credential');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <h5 className="card-header text-center">Update Credential</h5>
            <div className="card-body">
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
          <button className="btn btn-secondary mt-3" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCredential;
