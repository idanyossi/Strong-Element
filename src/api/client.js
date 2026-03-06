const getToken = () => localStorage.getItem('auth_token');

const apiFetch = async (path, options = {}) => {
  const token = getToken();
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw Object.assign(new Error(err.error || 'Request failed'), { status: res.status });
  }
  return res.json();
};

export const api = {
  auth: {
    login: (username, password) =>
      apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      }),
    me: () => apiFetch('/api/auth/me'),
    logout: () => localStorage.removeItem('auth_token'),
  },
  listings: {
    list: () => apiFetch('/api/listings'),
    featured: () => apiFetch('/api/listings?featured=true'),
    create: (data) =>
      apiFetch('/api/listings', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/api/listings/${id}`, { method: 'DELETE' }),
  },
  agents: {
    list: () => apiFetch('/api/agents'),
    create: (data) =>
      apiFetch('/api/agents', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/api/agents/${id}`, { method: 'DELETE' }),
  },
  articles: {
    list: () => apiFetch('/api/articles'),
    create: (data) =>
      apiFetch('/api/articles', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id) => apiFetch(`/api/articles/${id}`, { method: 'DELETE' }),
  },
};
