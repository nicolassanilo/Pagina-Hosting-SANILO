import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postJson } from '../api';
import { saveUserSession } from '../auth';

function RegisterPage({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await postJson('/auth/register', { name, email, password });
    if (data.token) {
      saveUserSession(data.user, data.token);
      setUser(data.user);
      navigate('/');
    } else {
      setMessage(data.message || 'Error al registrarse');
    }
  };

  return (
    <div className="auth-card">
      <h2>Registrar cuenta</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Crear cuenta</button>
      </form>
      {message && <p className="error">{message}</p>}
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
