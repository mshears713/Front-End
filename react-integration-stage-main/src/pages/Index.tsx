import { CheckCircle2, Circle } from 'lucide-react';
import { DocCallout } from '@/components/DocCallout/DocCallout';
import { CodeBlock, Prose, SectionHeading } from '@/components/DocPrimitives/DocPrimitives';

const goldenFlow = [
  { done: true, label: 'Project scaffolded with React + TypeScript + Vite' },
  { done: true, label: 'Layout: Sidebar, Header, Main content area' },
  { done: true, label: 'API Inspector panel wired to centralized client' },
  { done: true, label: 'API client reads VITE_API_BASE_URL from env' },
  { done: true, label: 'Home & Frameworks Overview pages' },
  { done: false, label: 'Users CRUD demo page' },
  { done: false, label: 'Auth flow demo page' },
  { done: false, label: 'Error handling & optimistic update patterns' },
  { done: false, label: 'Mock API layer for offline demos' },
];

const Index = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          API Integration Demo
        </h1>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-lg">
          A reference project for learning and demonstrating how a frontend talks to a backend.
          Every API call is logged live in the <span className="font-mono text-primary">Inspector</span> panel.
        </p>
      </div>

      <SectionHeading>What is this?</SectionHeading>
      <Prose>
        <p>
          This site is a <strong className="text-foreground">docs-style demo</strong> that shows common
          frontend ↔ backend integration patterns: CRUD operations, authentication flows,
          error handling, and more. It is not a production app — it's a teaching tool.
        </p>
      </Prose>

      <SectionHeading>How to use it</SectionHeading>

      <DocCallout variant="info">
        Point your backend at <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">VITE_API_BASE_URL</code> (defaults
        to <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">http://localhost:8000</code>). All demo pages
        hit <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">/api/v1/...</code> routes.
      </DocCallout>

      <DocCallout variant="warning">
        Without a running backend, API calls will fail — but you'll still see them in the Inspector.
        A mock layer is planned for offline use.
      </DocCallout>

      <Prose>
        <ol className="list-decimal list-inside space-y-1.5 text-foreground">
          <li>Browse demo pages from the sidebar</li>
          <li>Trigger API calls using the demo UIs</li>
          <li>Watch requests appear in the Inspector (right panel)</li>
          <li>Expand entries to see request/response bodies & latency</li>
        </ol>
      </Prose>

      <CodeBlock language="bash">{`# Example: set your backend URL\nVITE_API_BASE_URL=http://localhost:8000 npm run dev`}</CodeBlock>

      <SectionHeading>Golden Flow Checklist</SectionHeading>

      <DocCallout variant="success">
        Track project progress below. Checked items are implemented; unchecked items are coming next.
      </DocCallout>

      <ul className="space-y-2">
        {goldenFlow.map((item) => (
          <li key={item.label} className="flex items-start gap-3">
            {item.done ? (
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0" />
            )}
            <span className={`text-sm ${item.done ? 'text-foreground' : 'text-muted-foreground'}`}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground font-mono">
          Select a page from the sidebar to explore →
        </p>
      </div>
    </div>
  );
};

export default Index;
