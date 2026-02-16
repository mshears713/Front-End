import type { HttpMethod } from '@/lib/api/types';

const methodColors: Record<HttpMethod, string> = {
  GET: 'text-[hsl(var(--method-get))]',
  POST: 'text-[hsl(var(--method-post))]',
  PUT: 'text-[hsl(var(--method-put))]',
  PATCH: 'text-[hsl(var(--method-put))]',
  DELETE: 'text-[hsl(var(--method-delete))]',
};

export function MethodBadge({ method }: { method: HttpMethod }) {
  return (
    <span className={`font-mono text-xs font-semibold ${methodColors[method]}`}>
      {method}
    </span>
  );
}
