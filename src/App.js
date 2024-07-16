import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LoginForm from './LoginForm';
 // Update import path for AdminPage
import ManagerPage from './component/ManagerPage'; // Update import path for ManagerPage
import EmployeePage from './component/EmployeePage'; // Update import path for EmployeePage

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');

  const handleLogin = (userId, userRole) => {
    setUsername(userId);
    setRole(userRole);
    setIsLoggedIn(true);

    // Open different tab based on role
    switch (userRole) {
      case 'employee':
        openNewTab('/employee');
        break;
      case 'manager':
        openNewTab('/manager');
        break;
      default:
        break;
    }
  };

  const openNewTab = (path) => {
    const newWindow = window.open(path, '_blank');
    if (newWindow) {
      newWindow.focus();
    } else {
      alert('Popup blocked! Please allow popups for this website.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setRole('');
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Dashboard username={username} role={role} /> : <LoginForm onLogin={handleLogin} />} />
            <Route path="/admin" element={isLoggedIn && role === 'employee' ? <EmployeePage username={username} /> : <Navigate to="./component/EmployeePage" />} />
            <Route path="/manager" element={isLoggedIn && role === 'manager' ? <ManagerPage username={username} /> : <Navigate to="./component/ManagerPage" />} />
          </Routes>
          {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </header>
      </div>
    </Router>
  );
}

const Dashboard = ({ username, role }) => {
  return (
    <Routes>
      {/* Default route rendering based on user role */}
      <Route path="/" element={role === 'manager' ? <ManagerPage username={username} /> : <EmployeePage username={username} />} />
    </Routes>
  );
};

export default App;
