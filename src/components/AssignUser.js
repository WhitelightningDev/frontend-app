import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const AssignUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [divisions, setDivisions] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if token is not defined
      navigate('/login');
    } else {
      fetchDivisions(token);
    }
  }, [navigate]);

  const fetchDivisions = async (token) => {
    try {
      const headers = { 'x-auth-token': token };
      const response = await axios.get('http://localhost:3030/api/divisions', { headers });
      setDivisions(response.data);
    } catch (error) {
      console.error('Error fetching divisions:', error);
      toast.error('Error fetching divisions.');
    }
  };

  const handleAssignUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'x-auth-token': token };
      const data = { divisionId: selectedDivision }; // Adjust based on your backend API

      const response = await axios.put(`http://localhost:3030/api/users/${userId}/assign`, data, { headers });
      toast.success(response.data.message);
      navigate('/dashboard'); // Redirect to dashboard after successful action
    } catch (error) {
      console.error('Error assigning user:', error);
      toast.error('Error assigning user.');
    }
  };

  const handleUnassignUser = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { 'x-auth-token': token };
      const data = { divisionId: selectedDivision }; // Adjust based on your backend API

      const response = await axios.put(`http://localhost:3030/api/users/${userId}/unassign`, data, { headers });
      toast.success(response.data.message);
      navigate('/dashboard'); // Redirect to dashboard after successful action
    } catch (error) {
      console.error('Error unassigning user:', error);
      toast.error('Error unassigning user.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Assign/Unassign User</h1>

      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title">Select Division:</h5>
          <select
            className="form-select"
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
          >
            <option value="">Select Division</option>
            {divisions.map((division) => (
              <option key={division._id} value={division._id}>
                {division.name}
              </option>
            ))}
          </select>

          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={handleAssignUser}>
              Assign User
            </button>
            <button className="btn btn-warning" onClick={handleUnassignUser}>
              Unassign User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignUser;
