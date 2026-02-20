import { API_ROUTES } from './routes';
import { ResponseEnvelope, ErrorEnvelope } from './types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface InspectorEntry {
    id: string;
    method: string;
    url: string;
    status: number;
    latency: number;
    requestBody: any;
    responseBody: any;
    timestamp: string;
}

type InspectorListener = (entry: InspectorEntry) => void;
const listeners: InspectorListener[] = [];

export const addInspectorListener = (listener: InspectorListener) => {
    listeners.push(listener);
};

export const removeInspectorListener = (listener: InspectorListener) => {
    const index = listeners.indexOf(listener);
    if (index > -1) {
        listeners.splice(index, 1);
    }
};

const notifyInspector = (entry: InspectorEntry) => {
    listeners.forEach(l => l(entry));
};

async function request<T>(
    method: string,
    path: string,
    body?: any
): Promise<T> {
    const url = `${BASE_URL}${path}`;
    const start = performance.now();

    let responseBody: any;
    let status = 0;

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        status = response.status;
        responseBody = await response.json();

        if (!response.ok) {
            throw responseBody;
        }

        return responseBody;
    } catch (error) {
        if (!responseBody) {
            responseBody = { ok: false, error: { code: 'NETWORK_ERROR', message: 'Failed to connect to server' } };
        }
        throw error;
    } finally {
        const latency = Math.round(performance.now() - start);
        notifyInspector({
            id: Math.random().toString(36).substr(2, 9),
            method,
            url,
            status,
            latency,
            requestBody: body,
            responseBody,
            timestamp: new Date().toISOString(),
        });
    }
}

export const apiClient = {
    health: () => request<any>('GET', API_ROUTES.HEALTH),
    ping: () => request<any>('GET', API_ROUTES.PING),
    random: () => request<any>('GET', API_ROUTES.RANDOM),
    toggle: (value: boolean) => request<any>('POST', API_ROUTES.TOGGLE, { value }),
    validateForm: (data: any) => request<any>('POST', API_ROUTES.VALIDATE, data),
    listItems: (params: { q?: string; page?: number; page_size?: number }) => {
        const searchParams = new URLSearchParams();
        if (params.q) searchParams.append('q', params.q);
        if (params.page) searchParams.append('page', params.page.toString());
        if (params.page_size) searchParams.append('page_size', params.page_size.toString());
        return request<any>('GET', `${API_ROUTES.ITEMS}?${searchParams.toString()}`);
    },
    createJob: () => request<any>('POST', API_ROUTES.JOBS),
    getJob: (jobId: string) => request<any>('GET', `${API_ROUTES.JOBS}/${jobId}`),
};
