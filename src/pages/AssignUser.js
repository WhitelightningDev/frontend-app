import React, { useState, useEffect } from 'react';
import axios from '../services/api';
import { toast } from 'react-toastify';

const AssignUser = () => {
  const [users, setUsers] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'x-auth-token': token,
          },
        };
        const userResponse = await axios.get('/api/users', config);
        const divisionResponse = await axios.get('/api/divisions', config);
        setUsers(userResponse.data);
        setDivisions(divisionResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error.response.data.msg);
      }
    };

    fetchData();
  }, []);

  const handleAssign = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      await axios.post('/api/assign', { userId: selectedUser, divisionId: selectedDivision }, config);
      toast.success('User assigned successfully!');
    } catch (error) {
      console.error('Error assigning user:', error.response.data.msg);
      toast.error('Error assigning user.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Assign User to Division</h2>
      <div className="form-group">
        <label htmlFor="user">User</label>
        <select id="user" className="form-control" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.username}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="division">Division</label>
        <select id="division" className="form-control" value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)}>
          {divisions.map((division) => (
            <option key={division._id} value={division._id}>{division.name}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleAssign}>Assign</button>
    </div>
  );
};

export default AssignUser;
