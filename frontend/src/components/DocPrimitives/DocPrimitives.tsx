import type { ReactNode } from 'react';

export function CodeBlock({ language, children }: { language?: string; children: string }) {
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {language && (
        <div className="px-4 py-1.5 bg-muted border-b border-border">
          <span className="text-[10px] font-mono font-semibold text-muted-foreground uppercase tracking-wider">{language}</span>
        </div>
      )}
      <pre className="p-4 bg-card overflow-x-auto">
        <code className="text-[13px] font-mono text-foreground leading-relaxed">{children}</code>
      </pre>
    </div>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="prose-custom space-y-4 text-sm text-muted-foreground leading-relaxed">{children}</div>;
}

export function SectionHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="text-lg font-semibold text-foreground tracking-tight pt-6 first:pt-0 border-b border-border pb-2">
      {children}
    </h2>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return <h3 className="text-sm font-semibold text-foreground pt-4">{children}</h3>;
}
