export interface ResponseEnvelope<T> {
  ok: boolean;
  data: T;
  meta: Record<string, any>;
}

export interface ErrorEnvelope {
  ok: false;
  error: {
    code: string;
    message: string;
    details: Record<string, string>;
  };
}

export interface HealthData {
  status: string;
  version: string;
}

export interface PingData {
  pong: string;
  timestamp: number;
}

export interface RandomData {
  number: number;
  message?: string;
}

export interface ToggleData {
  value: boolean;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

export interface JobStatus {
  job_id: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  progress: number;
  result?: any;
}
