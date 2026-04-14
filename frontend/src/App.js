import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import BotForm from './components/BotForm';
import CreditsPage from './components/CreditsPage';
import Navbar from './components/Navbar';
import { getCurrentUser } from './auth';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const current = getCurrentUser();
    setUser(current);
  }, []);

  return (
    <div className="app-shell">
      <Navbar user={user} setUser={setUser} />
      <div className="page-content">
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage setUser={setUser} />} />
          <Route path="/" element={user ? <Dashboard user={user} /> : <LoginPage setUser={setUser} />} />
          <Route path="/bots/new" element={user ? <BotForm /> : <LoginPage setUser={setUser} />} />
          <Route path="/credits" element={user ? <CreditsPage /> : <LoginPage setUser={setUser} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
