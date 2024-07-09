import React, { useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const AddCredential = () => {
  const [credential, setCredential] = useState({ title: '', username: '', password: '', division: '' });

  const handleAdd = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      // Send a POST request to add the credential
      await axios.post('/api/credentials', credential, config);
      toast.success('Credential added successfully!');
      // Clear the form after successful submission
      setCredential({ title: '', username: '', password: '', division: '' });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Handle validation errors
        const errors = error.response.data.errors;
        Object.keys(errors).forEach(field => {
          toast.error(`${field}: ${errors[field].message}`);
        });
      } else {
        // Handle server errors
        console.error('Error adding credential:', error.response?.data?.msg || error.message);
        toast.error('Error adding credential.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Credential</h2>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          value={credential.title}
          onChange={(e) => setCredential({ ...credential, title: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={credential.username}
          onChange={(e) => setCredential({ ...credential, username: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={credential.password}
          onChange={(e) => setCredential({ ...credential, password: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label htmlFor="division">Division ID</label>
        <input
          type="text"
          className="form-control"
          id="division"
          value={credential.division}
          onChange={(e) => setCredential({ ...credential, division: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={handleAdd}>Add</button>
    </div>
  );
};

export default AddCredential;
