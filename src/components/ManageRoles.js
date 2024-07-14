import React, { useEffect, useState } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const ManageRoles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error.message);
      toast.error('Failed to fetch roles');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Manage Roles</h1>
      <ul className="list-group">
        {roles.map((role) => (
          <li key={role._id} className="list-group-item">
            {role.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRoles;
