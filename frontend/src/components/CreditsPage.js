import React, { useEffect, useState } from 'react';
import { getJson, postJson } from '../api';
import { getToken } from '../auth';

function CreditsPage() {
  const [credits, setCredits] = useState(0);
  const [message, setMessage] = useState('');

  const loadCredits = async () => {
    const data = await getJson('/credits', getToken());
    setCredits(data.credits || 0);
  };

  useEffect(() => {
    loadCredits();
  }, []);

  const handleAdd = async () => {
    const data = await postJson('/credits/add', { amount: 3 }, getToken());
    setCredits(data.credits);
    setMessage(data.message);
  };

  return (
    <div className="credits-card">
      <h2>Administración de créditos</h2>
      <p>Saldo actual: <strong>{credits}</strong> créditos</p>
      <button onClick={handleAdd}>Recargar créditos (simulado)</button>
      {message && <p className="success">{message}</p>}
      <p>Cada bot activo consume 1 crédito. Puedes activar bots adicionales al recargar.</p>
    </div>
  );
}

export default CreditsPage;
