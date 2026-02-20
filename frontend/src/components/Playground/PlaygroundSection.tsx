import { useState, type ReactNode } from 'react';
import { Lightbulb, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { JsonViewer } from './JsonViewer';

export type PlaygroundStatus = 'idle' | 'loading' | 'success' | 'error';

interface PlaygroundSectionProps {
  id?: string;
  title: string;
  description: string;
  learnCallout?: string;
  expectedResponse?: unknown;
  notes?: ReactNode;
  result?: unknown;
  status?: PlaygroundStatus;
  children: ReactNode;
}

function StatusIndicator({ status }: { status: PlaygroundStatus }) {
  if (status === 'idle') return null;
  if (status === 'loading')
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground">
        <Loader2 className="h-3 w-3 animate-spin" /> Running…
      </span>
    );
  if (status === 'success')
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-mono text-primary">
        <CheckCircle2 className="h-3 w-3" /> Success
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-destructive">
      <AlertCircle className="h-3 w-3" /> Error
    </span>
  );
}

export function PlaygroundSection({
  id,
  title,
  description,
  learnCallout,
  expectedResponse,
  notes,
  result,
  status = 'idle',
  children,
}: PlaygroundSectionProps) {
  const [activeTab, setActiveTab] = useState('demo');
  const hasExpected = expectedResponse !== undefined;
  const hasNotes = !!notes;

  return (
    <section
      id={id}
      className={`rounded-xl border bg-card transition-shadow duration-300 ${
        status === 'loading' ? 'ring-2 ring-primary/20 shadow-md' : 'shadow-sm'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-5 pt-5 pb-3">
        <div className="space-y-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground tracking-tight">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        <StatusIndicator status={status} />
      </div>

      {/* Learn callout */}
      {learnCallout && (
        <div className="mx-5 mb-3 flex gap-2.5 rounded-lg bg-accent/50 border border-accent-foreground/10 px-3.5 py-2.5">
          <Lightbulb className="h-3.5 w-3.5 mt-0.5 shrink-0 text-accent-foreground" />
          <p className="text-xs text-accent-foreground leading-relaxed">{learnCallout}</p>
        </div>
      )}

      {/* Tabbed content */}
      <div className="px-5 pb-5">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-8 bg-muted/50">
            <TabsTrigger value="demo" className="text-xs px-3 py-1 h-6">
              Live Demo
            </TabsTrigger>
            {hasExpected && (
              <TabsTrigger value="expected" className="text-xs px-3 py-1 h-6">
                Expected Response
              </TabsTrigger>
            )}
            {hasNotes && (
              <TabsTrigger value="notes" className="text-xs px-3 py-1 h-6">
                Notes
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="demo" className="mt-4 space-y-4">
            {/* Interactive area */}
            <div>{children}</div>

            {/* Result panel */}
            {result !== undefined && (
              <div className="space-y-1.5">
                <p className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
                  Response
                </p>
                <JsonViewer data={result} />
              </div>
            )}
          </TabsContent>

          {hasExpected && (
            <TabsContent value="expected" className="mt-4">
              <JsonViewer data={expectedResponse} defaultOpen />
            </TabsContent>
          )}

          {hasNotes && (
            <TabsContent value="notes" className="mt-4">
              <div className="text-sm text-muted-foreground leading-relaxed space-y-2">
                {notes}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </section>
  );
}
