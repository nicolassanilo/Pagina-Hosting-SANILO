import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { clearSession, getCurrentUser } from '../auth';

function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const currentUser = user || getCurrentUser();

  const logout = () => {
    clearSession();
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="brand">WhatsApp Bot Platform</div>
      {currentUser ? (
        <div className="nav-links">
          <Link to="/">Dashboard</Link>
          <Link to="/bots/new">Crear Bot</Link>
          <Link to="/credits">Créditos</Link>
          <button className="btn-link" onClick={logout}>Salir</button>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Registrarse</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
