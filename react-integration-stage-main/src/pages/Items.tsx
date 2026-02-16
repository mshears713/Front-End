import { useEffect, useState } from 'react';
import { listItems } from '@/lib/api/actions';

export default function Items() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<unknown[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    listItems({ page, limit: 10 }).then((res) => {
      if (cancelled) return;
      if (res.ok && Array.isArray(res.data)) setItems(res.data);
      else {
        setItems([]);
        setError(res.error ?? 'No data returned');
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [page]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground tracking-tight">Items</h1>
      <p className="text-sm text-muted-foreground">Paginated list from <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">/api/v1/posts</code>.</p>

      {loading && <p className="text-sm text-muted-foreground font-mono">Loading page {page}…</p>}
      {error && <p className="text-sm text-destructive font-mono">{error}</p>}

      {!loading && items.length > 0 && (
        <ul className="space-y-1 list-disc list-inside text-sm text-foreground">
          {items.map((item, i) => (
            <li key={i} className="font-mono text-xs">{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page <= 1}
          className="px-3 py-1.5 text-xs rounded-md bg-secondary text-secondary-foreground hover:opacity-90 disabled:opacity-30"
        >
          Prev
        </button>
        <span className="text-xs font-mono text-muted-foreground">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1.5 text-xs rounded-md bg-secondary text-secondary-foreground hover:opacity-90"
        >
          Next Page
        </button>
      </div>
    </div>
  );
}
