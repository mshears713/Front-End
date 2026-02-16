import type { HttpMethod, NormalizedResponse, ApiLogEntry } from './types';

let _pushLog: ((entry: ApiLogEntry) => void) | null = null;

export function bindInspector(pushLog: (entry: ApiLogEntry) => void) {
  _pushLog = pushLog;
}

let idCounter = 0;

export async function apiCall<T = unknown>(
  method: HttpMethod,
  url: string,
  body?: unknown
): Promise<NormalizedResponse<T>> {
  const start = performance.now();
  const id = `req_${++idCounter}_${Date.now()}`;

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const latencyMs = Math.round(performance.now() - start);
    const json = await res.json().catch(() => ({}));

    const normalized: NormalizedResponse<T> = json.ok === true
      ? { ok: true, data: json.data as T, error: null, meta: json.meta }
      : { ok: false, data: null, error: json.error ?? `HTTP ${res.status}` };

    _pushLog?.({
      id,
      timestamp: new Date(),
      method,
      url,
      requestBody: body,
      responseBody: json,
      status: res.status,
      latencyMs,
    });

    return normalized;
  } catch (err) {
    const latencyMs = Math.round(performance.now() - start);
    const error = err instanceof Error ? err.message : 'Unknown error';

    _pushLog?.({
      id,
      timestamp: new Date(),
      method,
      url,
      requestBody: body,
      latencyMs,
      error,
    });

    return { ok: false, data: null, error };
  }
}

export const api = {
  get: <T = unknown>(url: string) => apiCall<T>('GET', url),
  post: <T = unknown>(url: string, body?: unknown) => apiCall<T>('POST', url, body),
  put: <T = unknown>(url: string, body?: unknown) => apiCall<T>('PUT', url, body),
  patch: <T = unknown>(url: string, body?: unknown) => apiCall<T>('PATCH', url, body),
  delete: <T = unknown>(url: string) => apiCall<T>('DELETE', url),
};
