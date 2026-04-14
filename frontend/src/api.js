const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getJson = async (path, token) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: token ? `Bearer ${token}` : '' },
  });
  return res.json();
};

const postJson = async (path, body, token) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

const putJson = async (path, body, token) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(body),
  });
  return res.json();
};

const deleteJson = async (path, token) => {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: { Authorization: token ? `Bearer ${token}` : '' },
  });
  return res.json();
};

export { getJson, postJson, putJson, deleteJson };
