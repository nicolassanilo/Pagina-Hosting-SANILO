import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getJson, deleteJson, putJson } from '../api';
import { getToken } from '../auth';

function Dashboard() {
  const [bots, setBots] = useState([]);
  const [message, setMessage] = useState('');

  const loadBots = async () => {
    const data = await getJson('/bots', getToken());
    setBots(data || []);
  };

  useEffect(() => {
    loadBots();
  }, []);

  const handleToggle = async (bot) => {
    const data = await putJson(`/bots/${bot._id}`, { isActive: !bot.isActive }, getToken());
    if (data._id) {
      setBots((prev) => prev.map((item) => (item._id === data._id ? data : item)));
      setMessage('Estado de bot actualizado');
    }
  };

  const handleDelete = async (id) => {
    await deleteJson(`/bots/${id}`, getToken());
    setBots((prev) => prev.filter((bot) => bot._id !== id));
    setMessage('Bot eliminado');
  };

  return (
    <div className="dashboard-card">
      <h2>Mis bots</h2>
      {message && <p className="success">{message}</p>}
      <div className="bot-grid">
        {bots.length === 0 ? (
          <p>No tienes bots activos aún. Empieza creando uno.</p>
        ) : (
          bots.map((bot) => (
            <div key={bot._id} className="bot-card">
              <h3>{bot.name}</h3>
              <p>Estado: <strong>{bot.isActive ? 'Online' : 'Offline'}</strong></p>
              <p>Número: {bot.phoneNumber}</p>
              <p>Webhook: {bot.webhookUrl}</p>
              <div className="bot-actions">
                <button onClick={() => handleToggle(bot)}>{bot.isActive ? 'Desactivar' : 'Activar'}</button>
                <button className="danger" onClick={() => handleDelete(bot._id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
      <Link to="/bots/new" className="primary-button">Agregar nuevo bot</Link>
    </div>
  );
}

export default Dashboard;
