import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postJson } from '../api';
import { getToken } from '../auth';

function BotForm() {
  const [name, setName] = useState('');
  const [accountSid, setAccountSid] = useState('');
  const [authToken, setAuthToken] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await postJson(
      '/bots',
      { name, accountSid, authToken, phoneNumber, webhookUrl },
      getToken()
    );

    if (data._id) {
      setMessage('Bot creado correctamente');
      navigate('/');
    } else {
      setMessage(data.message || 'Error al crear bot');
    }
  };

  return (
    <div className="form-card">
      <h2>Crear bot de WhatsApp</h2>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del bot" required />
        <input value={accountSid} onChange={(e) => setAccountSid(e.target.value)} placeholder="Account SID" required />
        <input value={authToken} onChange={(e) => setAuthToken(e.target.value)} placeholder="Auth Token" required />
        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Número de WhatsApp" required />
        <input value={webhookUrl} onChange={(e) => setWebhookUrl(e.target.value)} placeholder="Webhook URL" required />
        <button type="submit">Guardar bot</button>
      </form>
      {message && <p className="success">{message}</p>}
    </div>
  );
}

export default BotForm;
