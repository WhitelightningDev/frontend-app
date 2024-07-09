import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageRoles = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [newRole, setNewRole] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
            'Access-Control-Allow-Origin': '*', // CORS header
          },
        };
        const response = await axios.get('/api/users', config);
        setUsers(response.data);

        const role = localStorage.getItem('role');
        setIsAdmin(role === 'Admin');

        const username = localStorage.getItem('username');
        const loggedInUser = response.data.find(user => user.username === username);
        setCurrentUser(loggedInUser);
      } catch (error) {
        console.error('Error fetching users:', error.response?.data?.msg || error.message);
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
          'Access-Control-Allow-Origin': '*', // CORS header
        },
      };

      if (isAdmin) {
        await axios.post('/api/users/change-role', { userId: selectedUser, role: newRole }, config);
        toast.success('User role updated successfully!');
      } else if (currentUser && currentUser._id === selectedUser) {
        await axios.post('/api/users/change-role', { userId: currentUser._id, role: newRole }, config);
        toast.success('Your role updated successfully!');
      } else {
        toast.error('You are not authorized to change this role.');
      }
    } catch (error) {
      console.error('Error updating user role:', error.response?.data?.msg || error.message);
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
          <button className="btn btn-primary" onClick={handleRoleChange} disabled={!selectedUser || !newRole}>Change Role</button>
        </div>
      ) : currentUser ? (
        <div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select id="role" className="form-control" value={newRole} onChange={(e) => setNewRole(e.target.value)}>
              <option value="">Select a role</option>
              <option value="Normal">Normal</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleRoleChange} disabled={!newRole}>Change My Role</button>
        </div>
      ) : (
        <p>You must be logged in to manage user roles.</p>
      )}
    </div>
  );
};

export default ManageRoles;
