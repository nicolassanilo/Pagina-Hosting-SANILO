import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postJson } from '../api';
import { saveUserSession } from '../auth';

function LoginPage({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await postJson('/auth/login', { email, password });
    if (data.token) {
      saveUserSession(data.user, data.token);
      setUser(data.user);
      navigate('/');
    } else {
      setMessage(data.message || 'Error de login');
    }
  };

  return (
    <div className="auth-card">
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Ingresar</button>
      </form>
      {message && <p className="error">{message}</p>}
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
}

export default LoginPage;
