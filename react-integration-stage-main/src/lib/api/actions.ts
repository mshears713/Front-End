import { api } from './client';
import { routes } from './routes';

// API Basics
export const ping = () => api.get(routes.health());
export const random = () => api.get(`${routes.health()}/random`);
export const toggle = (value: boolean) => api.post(`${routes.health()}/toggle`, { value });

// Forms
export const validateForm = (payload: { name: string; email: string; age: number }) =>
  api.post(`${routes.users.create()}`, payload);

// Items
export const listItems = (params: { page?: number; limit?: number } = {}) => {
  const q = new URLSearchParams();
  if (params.page) q.set('page', String(params.page));
  if (params.limit) q.set('limit', String(params.limit));
  const qs = q.toString();
  return api.get(`${routes.posts.list()}${qs ? `?${qs}` : ''}`);
};

// Jobs
export const startJob = () => api.post(`${routes.health()}/jobs`);
export const getJob = (jobId: string) => api.get(`${routes.health()}/jobs/${jobId}`);
