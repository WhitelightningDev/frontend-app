import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCredential = () => {
  const [credentials, setCredentials] = useState([]); // State to store credentials
  const [selectedCredential, setSelectedCredential] = useState(null); // State to manage selected credential for update
  const [divisions, setDivisions] = useState([]); // State to store divisions
  const [ous, setOUs] = useState([]); // State to store OUs
  const navigate = useNavigate(); // Navigation hook from React Router
  const { id } = useParams(); // Accessing URL parameters, if needed

  useEffect(() => {
    fetchCredentials(); // Fetch credentials on component mount
    fetchDivisions(); // Fetch divisions on component mount
    fetchOUs(); // Fetch OUs on component mount
  }, []);

  // Function to fetch credentials from the API
  const fetchCredentials = async () => {
    try {
      const response = await axios.get('/api/credentials');
      setCredentials(response.data); // Set credentials in state
    } catch (error) {
      console.error('Error fetching credentials:', error.message);
      toast.error('Failed to fetch credentials');
    }
  };

  // Function to fetch divisions from the API
  const fetchDivisions = async () => {
    try {
      const response = await axios.get('/api/divisions');
      setDivisions(response.data); // Set divisions in state
    } catch (error) {
      console.error('Error fetching divisions:', error.message);
      toast.error('Failed to fetch divisions');
    }
  };

  // Function to fetch OUs from the API
  const fetchOUs = async () => {
    try {
      const response = await axios.get('/api/ous');
      setOUs(response.data); // Set OUs in state
    } catch (error) {
      console.error('Error fetching OUs:', error.message);
      toast.error('Failed to fetch OUs');
    }
  };

  // Function to handle selecting a credential for update
  const handleSelectCredential = (credential) => {
    setSelectedCredential({
      ...credential,
      division: credential.division?._id || '', // Safely access division ID
      ou: credential.ou?._id || '', // Safely access OU ID
    });
  };

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    setSelectedCredential({ ...selectedCredential, [e.target.name]: e.target.value });
  };

  // Function to handle form submission for updating a credential
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/credentials/${selectedCredential._id}`, selectedCredential);
      toast.success('Credential updated successfully');
      fetchCredentials(); // Refresh credentials list after update
      setSelectedCredential(null); // Clear selected credential after update
    } catch (error) {
      console.error('Error updating credential:', error.message);
      toast.error('Failed to update credential');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Update Credentials</h1>

      {/* Description */}
      <p className="lead">
        Select a credential from the list below to update its details and assign or deassign it to an OU.
        Make changes as necessary and click "Update Credential" to save your changes. Note that by assigning
        a user to a different OU, you automatically deassign them from the previous OU. Please be aware that
        not all OUs may appear in the update page due to access restrictions.
      </p>

      {/* List of Credentials */}
      <ul className="list-group">
        {credentials.map((credential) => (
          <li key={credential._id} className="list-group-item">
            <h5>{credential.title}</h5>
            <p>Username: {credential.username}</p>
            <p>Division: {credential.division?.name || 'No Division'}</p>
            <p>OU: {credential.ou?.name || 'No OU'}</p>
            <button
              className="btn btn-primary"
              onClick={() => handleSelectCredential(credential)}
            >
              Update
            </button>
          </li>
        ))}
      </ul>

      {/* Update Form */}
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
              <div className="form-group">
                <label htmlFor="ou">OU</label>
                <select
                  className="form-control"
                  id="ou"
                  name="ou"
                  value={selectedCredential.ou}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select OU</option>
                  {ous.map((ou) => (
                    <option key={ou._id} value={ou._id}>
                      {ou.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary btn-block">Update Credential</button>
            </form>
          </div>
        </div>
      )}

      {/* Back to Dashboard Button */}
      <button className="btn btn-secondary mt-3" onClick={() => navigate('/dashboard')}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default UpdateCredential;
