const BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';
const API = `${BASE}/api/v1`;

export const routes = {
  health: () => `${API}/health`,
  actions: {
    ping: () => `${API}/actions/ping`,
    random: () => `${API}/actions/random`,
    toggle: () => `${API}/actions/toggle`,
  },
  forms: {
    validate: () => `${API}/forms/validate`,
  },
  items: {
    list: () => `${API}/items`,
  },
  jobs: {
    base: () => `${API}/jobs`,
    status: (id: string) => `${API}/jobs/${id}`,
  },
} as const;
