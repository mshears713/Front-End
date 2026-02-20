import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { ApiLogEntry } from '@/lib/api/types';

interface ApiInspectorContextValue {
  logs: ApiLogEntry[];
  pushLog: (entry: ApiLogEntry) => void;
  clearLogs: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ApiInspectorContext = createContext<ApiInspectorContextValue | null>(null);

export function ApiInspectorProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<ApiLogEntry[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const pushLog = useCallback((entry: ApiLogEntry) => {
    setLogs((prev) => [entry, ...prev].slice(0, 50));
  }, []);

  const clearLogs = useCallback(() => setLogs([]), []);

  return (
    <ApiInspectorContext.Provider value={{ logs, pushLog, clearLogs, isOpen, setIsOpen }}>
      {children}
    </ApiInspectorContext.Provider>
  );
}

export function useApiInspector() {
  const ctx = useContext(ApiInspectorContext);
  if (!ctx) throw new Error('useApiInspector must be used within ApiInspectorProvider');
  return ctx;
}
