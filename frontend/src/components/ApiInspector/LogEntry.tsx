import { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import type { ApiLogEntry } from '@/lib/api/types';
import { MethodBadge } from './MethodBadge';

function JsonBlock({ label, data }: { label: string; data: unknown }) {
  if (data === undefined || data === null) return null;
  return (
    <div className="mt-2">
      <p className="text-[10px] uppercase tracking-wider text-[hsl(var(--inspector-fg))] opacity-60 mb-1">
        {label}
      </p>
      <pre className="text-[11px] font-mono text-[hsl(var(--inspector-fg))] bg-[hsl(var(--inspector-border))] rounded p-2 overflow-x-auto max-h-40">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export function LogEntry({ entry }: { entry: ApiLogEntry }) {
  const [expanded, setExpanded] = useState(false);
  const shortUrl = entry.url.replace(/^https?:\/\/[^/]+/, '');
  const time = entry.timestamp.toLocaleTimeString('en-US', { hour12: false });

  return (
    <div className="border-b border-[hsl(var(--inspector-border))] last:border-b-0">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2.5 text-left hover:bg-[hsl(var(--inspector-border))]/50 transition-colors"
      >
        {expanded ? (
          <ChevronDown className="h-3 w-3 text-[hsl(var(--inspector-fg))] shrink-0" />
        ) : (
          <ChevronRight className="h-3 w-3 text-[hsl(var(--inspector-fg))] shrink-0" />
        )}

        <MethodBadge method={entry.method} />

        <span className="font-mono text-xs text-[hsl(var(--inspector-fg))] truncate flex-1">
          {shortUrl}
        </span>

        {entry.error ? (
          <AlertCircle className="h-3 w-3 text-destructive shrink-0" />
        ) : (
          <span className="text-[10px] font-mono text-[hsl(var(--inspector-fg))] opacity-60 shrink-0">
            {entry.status}
          </span>
        )}

        <span className="flex items-center gap-1 text-[10px] font-mono text-[hsl(var(--inspector-fg))] opacity-50 shrink-0">
          <Clock className="h-2.5 w-2.5" />
          {entry.latencyMs}ms
        </span>
      </button>

      {expanded && (
        <div className="px-3 pb-3 space-y-1">
          <p className="text-[10px] font-mono text-[hsl(var(--inspector-fg))] opacity-50">
            {time} · {entry.url}
          </p>
          {entry.error && (
            <p className="text-xs text-destructive font-mono">{entry.error}</p>
          )}
          <JsonBlock label="Request Body" data={entry.requestBody} />
          <JsonBlock label="Response Body" data={entry.responseBody} />
        </div>
      )}
    </div>
  );
}
