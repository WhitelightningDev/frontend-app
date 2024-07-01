import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import AssignUser from './pages/AssignUser';
import Dashboard from './components/Dashboard';
import NotFound from './pages/NotFound';
import ManageRoles from './pages/ManageRoles';
import UpdateCredential from './pages/UpdateCredential';
import ViewCredentials from './pages/ViewCredentials';
import AddCredential from './pages/AddCredential';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer autoClose={3000} hideProgressBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/AssignUser" element={<AssignUser />} />
          <Route path="/manage-roles" element={<ManageRoles />} />
          <Route path="/update-credential" element={<UpdateCredential />} />
          <Route path="/view-credentials" element={<ViewCredentials />} />
          <Route path="/add-credential" element={<AddCredential />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
