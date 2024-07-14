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

function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem('role'));
  const [userName, setUserName] = useState(localStorage.getItem('username'));

  const handleLogin = (role, username) => {
    setUserRole(role);
    setUserName(username);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
  };

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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />

          {userRole && (
            <>
              <Route path="/dashboard" element={<Dashboard userRole={userRole} userName={userName} onLogout={handleLogout} />} />
              {userRole === 'Admin' && <Route path="/manage-roles" element={<ManageRoles />} />}
              {(userRole === 'Admin' || userRole === 'Manager') && (
                <>
                  <Route path="/update-credential" element={<UpdateCredential />} />
                  <Route path="/view-credentials" element={<ViewCredentials />} />
                  <Route path="/add-credential" element={<AddCredential />} />
                </>
              )}
              {userRole === 'Normal' && <Route path="*" element={<Navigate to="/" />} />}
            </>
          )}

          {!userRole && <Route path="*" element={<Navigate to="/login" />} />}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
