import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const ManageRoles = () => {
  const [roles, setRoles] = useState(['Admin', 'Manager', 'Normal']);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const headers = { 'x-auth-token': token };

      const usersResponse = await api.get('/api/users', { headers });
      setUsers(usersResponse.data);

      toast.success('Users fetched successfully');
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'x-auth-token': token };

      // Update user role with PUT request
      await api.put(`/api/users/${userId}/roles`, { role: newRole }, { headers });
      toast.success('Role changed successfully');
      fetchUsers(); // Refresh users after role change
    } catch (error) {
      console.error('Failed to change role:', error.message);
      toast.error('Failed to change role');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Manage Roles</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h2>Users</h2>
          <ul className="list-group">
            {users.map((user) => (
              <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  {user.username} - Current Role: {user.role}
                </div>
                <div>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="form-select form-select-sm"
                  >
                    <option value="">Select New Role</option>
                    {roles.map((role, index) => (
                      <option key={index} value={role}>{role}</option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-primary ms-2"
                    onClick={() => handleRoleChange(user._id, user.role)}
                  >
                    Submit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ManageRoles;
