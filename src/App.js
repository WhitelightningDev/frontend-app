import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './pages/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ManageRoles from './components/ManageRoles';
import UpdateCredential from './components/UpdateCredential';
import ViewCredentials from './components/ViewCredentials';
import AddCredential from './components/AddCredential';
import Register from './components/Register';
import ChangeRole from './components/ChangeRole'; // Import ChangeRole component
import AssignUserToDivision from './components/AssignUser'; // Import AssignUserToDivision component

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));
  const [userName, setUserName] = useState(localStorage.getItem('username'));

  // Function to handle user login
  const handleLogin = (role, username) => {
    setUserRole(role);
    setUserName(username);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
  };

  // Function to handle user logout
  const handleLogout = () => {
    setUserRole(null);
    setUserName(null);
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  return (
    <Router>
      <div className="App">
        <ToastContainer autoClose={3000} hideProgressBar />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes for authenticated users */}
          {userRole && (
            <>
              <Route path="/dashboard" element={<Dashboard userRole={userRole} userName={userName} onLogout={handleLogout} />} />
              <Route path="/manage-roles" element={<ManageRoles />} />
              {(userRole === 'Admin' || userRole === 'Manager') && (
                <>
                  <Route path="/update-credential" element={<UpdateCredential />} />
                  <Route path="/view-credentials" element={<ViewCredentials />} />
                  <Route path="/add-credential" element={<AddCredential />} />
                  <Route path="/change-role/:userId" element={<ChangeRole />} /> {/* Define dynamic route */}
                  <Route path="/assign-user-to-division/:userId" element={<AssignUserToDivision />} /> {/* Define dynamic route */}
                </>
              )}
              {userRole === 'Normal' && (
                <>
                  <Route path="/view-credentials" element={<ViewCredentials />} />
                  <Route path="/add-credential" element={<AddCredential />} />
                </>
              )}
            </>
          )}

          {/* Redirect to login page if not authenticated */}
          {!userRole && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
