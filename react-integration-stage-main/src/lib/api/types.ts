export interface ApiSuccessResponse<T = unknown> {
  ok: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  ok: false;
  error: string;
}

export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface NormalizedResponse<T = unknown> {
  ok: boolean;
  data: T | null;
  error: string | null;
  meta?: Record<string, unknown>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiLogEntry {
  id: string;
  timestamp: Date;
  method: HttpMethod;
  url: string;
  requestBody?: unknown;
  responseBody?: unknown;
  status?: number;
  latencyMs: number;
  error?: string;
}
