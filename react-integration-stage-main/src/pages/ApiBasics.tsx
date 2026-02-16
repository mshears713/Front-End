import { useState } from 'react';
import { ping, random, toggle } from '@/lib/api/actions';

function ResultBlock({ data, loading }: { data: unknown; loading: boolean }) {
  if (loading) return <p className="text-sm text-muted-foreground font-mono">Loading…</p>;
  if (data === undefined) return null;
  return (
    <pre className="text-xs font-mono bg-card border border-border rounded p-3 overflow-x-auto mt-2 max-h-40">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

export default function ApiBasics() {
  const [result, setResult] = useState<{ key: string; data: unknown }>({ key: '', data: undefined });
  const [loading, setLoading] = useState(false);
  const [toggleVal, setToggleVal] = useState(false);

  const run = async (key: string, fn: () => Promise<unknown>) => {
    setLoading(true);
    setResult({ key, data: undefined });
    const res = await fn();
    setResult({ key, data: res });
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground tracking-tight">API Basics</h1>
      <p className="text-sm text-muted-foreground">Three simple calls. Watch the Inspector panel.</p>

      <div className="flex gap-3 flex-wrap">
        <button onClick={() => run('ping', ping)} className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
          Ping
        </button>
        <button onClick={() => run('random', random)} className="px-4 py-2 text-sm rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity">
          Random
        </button>
        <button
          onClick={() => {
            const next = !toggleVal;
            setToggleVal(next);
            run('toggle', () => toggle(next));
          }}
          className="px-4 py-2 text-sm rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity"
        >
          Toggle ({toggleVal ? 'ON' : 'OFF'})
        </button>
      </div>

      {(loading || result.data !== undefined) && (
        <div>
          <p className="text-xs font-mono text-muted-foreground mb-1">{result.key}</p>
          <ResultBlock data={result.data} loading={loading} />
        </div>
      )}
    </div>
  );
}
