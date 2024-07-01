import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const ManageRoles = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newRole, setNewRole] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const response = await axios.get('/api/users', config);
        setUsers(response.data);

        // Check if logged-in user is an admin
        const currentUser = response.data.find(user => user.username === localStorage.getItem('username'));
        setIsAdmin(currentUser.role === 'Admin');
      } catch (error) {
        console.error('Error fetching users:', error.response.data.msg);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.post('/api/users/change-role', { userId: selectedUser, role: newRole }, config);
      toast.success('User role updated successfully!');
    } catch (error) {
      console.error('Error updating user role:', error.response.data.msg);
      toast.error('Error updating user role.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Manage User Roles</h2>
      {isAdmin ? (
        <div>
          <div className="form-group">
            <label htmlFor="user">User</label>
            <select id="user" className="form-control" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>{user.username}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" className="form-control" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              <option value="">Select a role</option>
              <option value="Normal">Normal</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleRoleChange}>Change Role</button>
        </div>
      ) : (
        <p>You do not have permission to change user roles.</p>
      )}
    </div>
  );
};

export default ManageRoles;
