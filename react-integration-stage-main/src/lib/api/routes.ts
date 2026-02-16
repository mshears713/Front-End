const BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';
const API = `${BASE}/api/v1`;

export const routes = {
  health: () => `${API}/health`,
  users: {
    list: () => `${API}/users`,
    get: (id: string) => `${API}/users/${id}`,
    create: () => `${API}/users`,
    update: (id: string) => `${API}/users/${id}`,
    delete: (id: string) => `${API}/users/${id}`,
  },
  posts: {
    list: () => `${API}/posts`,
    get: (id: string) => `${API}/posts/${id}`,
    create: () => `${API}/posts`,
  },
} as const;
