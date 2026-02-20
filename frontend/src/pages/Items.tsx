import { useEffect, useState } from 'react';
import { listItems } from '@/lib/api/actions';
import { PageHeader } from '@/components/Playground/PageHeader';
import { PlaygroundSection, type PlaygroundStatus } from '@/components/Playground/PlaygroundSection';

export default function Items() {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<unknown[]>([]);
  const [status, setStatus] = useState<PlaygroundStatus>('idle');
  const [rawResult, setRawResult] = useState<unknown>(undefined);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    listItems({ page, page_size: 10 }).then((res) => {
      if (cancelled) return;
      setRawResult(res);
      if (res.ok && Array.isArray(res.data)) {
        setItems(res.data);
        setStatus('success');
      } else {
        setItems([]);
        setStatus('error');
      }
    });
    return () => { cancelled = true; };
  }, [page]);

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Items List"
        description="Paginated data fetching from a REST endpoint. Demonstrates query parameter serialization and list rendering from API responses."
      />

      <PlaygroundSection
        title="Paginated Posts"
        description={`Fetches page ${page} from /api/v1/posts with a limit of 10 items per page.`}
        learnCallout="Notice how the query string changes in the Inspector as you navigate pages. The client serializes page and limit into URL parameters."
        status={status}
        result={rawResult}
        expectedResponse={{
          ok: true,
          data: [
            { id: 1, title: 'First Post', userId: 1 },
            { id: 2, title: 'Second Post', userId: 1 },
          ],
          meta: { page: 1, limit: 10, total: 100 },
        }}
        notes={
          <p>
            Endpoint: <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">GET /api/v1/posts?page=N&limit=10</code>.
            The response shape includes a <code className="font-mono text-xs">data</code> array and optional <code className="font-mono text-xs">meta</code> for pagination info.
          </p>
        }
      >
        <div className="space-y-3">
          {items.length > 0 ? (
            <ul className="space-y-1 list-disc list-inside text-sm text-foreground">
              {items.map((item, i) => (
                <li key={i} className="font-mono text-xs">{JSON.stringify(item)}</li>
              ))}
            </ul>
          ) : status !== 'loading' ? (
            <p className="text-sm text-muted-foreground font-mono">No items returned.</p>
          ) : null}

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 text-xs rounded-md bg-secondary text-secondary-foreground hover:opacity-90 disabled:opacity-30"
            >
              ← Prev
            </button>
            <span className="text-xs font-mono text-muted-foreground">Page {page}</span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 text-xs rounded-md bg-secondary text-secondary-foreground hover:opacity-90"
            >
              Next →
            </button>
          </div>
        </div>
      </PlaygroundSection>
    </div>
  );
}
