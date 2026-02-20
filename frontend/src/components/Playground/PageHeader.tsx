import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  sections?: { id: string; label: string }[];
  children?: ReactNode;
}

export function PageHeader({ title, description, sections }: PageHeaderProps) {
  return (
    <div className="space-y-4 pb-6 border-b border-border mb-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-xl">{description}</p>
      </div>

      {sections && sections.length > 0 && (
        <nav className="flex flex-wrap gap-2">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
