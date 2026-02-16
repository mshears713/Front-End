import type { ReactNode } from 'react';

export function DemoCard({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}
