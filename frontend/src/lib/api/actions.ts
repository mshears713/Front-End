import { api } from './client';
import { routes } from './routes';

// API Basics
export const ping = () => api.get(routes.actions.ping());
export const random = () => api.get(routes.actions.random());
export const toggle = (value: boolean) => api.post(routes.actions.toggle(), { value });

// Forms
export const validateForm = (payload: { name: string; email: string; age: number }) =>
  api.post(routes.forms.validate(), payload);

// Items
export const listItems = (params: { q?: string; page?: number; page_size?: number } = {}) => {
  const q = new URLSearchParams();
  if (params.q) q.set('q', params.q);
  if (params.page) q.set('page', String(params.page));
  if (params.page_size) q.set('page_size', String(params.page_size));
  const qs = q.toString();
  return api.get(`${routes.items.list()}${qs ? `?${qs}` : ''}`);
};

// Jobs
export const startJob = () => api.post(routes.jobs.base());
export const getJob = (jobId: string) => api.get(routes.jobs.status(jobId));
