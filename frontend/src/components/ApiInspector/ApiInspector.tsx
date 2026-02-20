import { Trash2, Radio } from 'lucide-react';
import { useApiInspector } from '@/contexts/ApiInspectorContext';
import { LogEntry } from './LogEntry';

export function ApiInspector() {
  const { logs, clearLogs, isOpen } = useApiInspector();

  if (!isOpen) return null;

  return (
    <aside className="w-80 shrink-0 h-screen sticky top-0 flex flex-col border-l border-border bg-[hsl(var(--inspector-bg))] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[hsl(var(--inspector-border))]">
        <div className="flex items-center gap-2">
          <Radio className="h-3.5 w-3.5 text-[hsl(var(--inspector-accent))]" />
          <span className="text-xs font-semibold font-mono text-[hsl(var(--inspector-fg))]">
            API Inspector
          </span>
        </div>
        <button
          onClick={clearLogs}
          className="p-1 rounded hover:bg-[hsl(var(--inspector-border))] transition-colors"
          title="Clear history"
        >
          <Trash2 className="h-3.5 w-3.5 text-[hsl(var(--inspector-fg))] opacity-60" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <Radio className="h-8 w-8 text-[hsl(var(--inspector-fg))] opacity-20 mb-3" />
            <p className="text-xs font-mono text-[hsl(var(--inspector-fg))] opacity-40">
              No API calls yet
            </p>
            <p className="text-[10px] font-mono text-[hsl(var(--inspector-fg))] opacity-25 mt-1">
              Make a request to see it here
            </p>
          </div>
        ) : (
          logs.map((entry) => <LogEntry key={entry.id} entry={entry} />)
        )}
      </div>
    </aside>
  );
}
