import { useState } from 'react';
import { ping, random, toggle } from '@/lib/api/actions';
import { PageHeader } from '@/components/Playground/PageHeader';
import { PlaygroundSection, type PlaygroundStatus } from '@/components/Playground/PlaygroundSection';

const sections = [
  { id: 'ping', label: 'Ping' },
  { id: 'random', label: 'Random' },
  { id: 'toggle', label: 'Toggle' },
];

export default function ApiBasics() {
  const [results, setResults] = useState<Record<string, { data: unknown; status: PlaygroundStatus }>>({});
  const [toggleVal, setToggleVal] = useState(false);

  const run = async (key: string, fn: () => Promise<unknown>) => {
    setResults((r) => ({ ...r, [key]: { data: undefined, status: 'loading' } }));
    try {
      const res = await fn();
      setResults((r) => ({ ...r, [key]: { data: res, status: 'success' } }));
    } catch {
      setResults((r) => ({ ...r, [key]: { data: 'Request failed', status: 'error' } }));
    }
  };

  const r = (key: string) => results[key] ?? { data: undefined, status: 'idle' as PlaygroundStatus };

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="API Basics"
        description="Three fundamental request patterns. Each button fires a call through the centralized API client — watch the Inspector panel to see method, URL, latency, and response."
        sections={sections}
      />

      <div className="space-y-6">
        <PlaygroundSection
          id="ping"
          title="Ping"
          description="A simple health-check GET request. Verifies the backend is reachable."
          learnCallout="This is the simplest possible API call — a GET with no parameters. Great for testing connectivity."
          status={r('ping').status}
          result={r('ping').data}
          expectedResponse={{ ok: true, data: { status: 'healthy', timestamp: '2024-01-01T00:00:00Z' } }}
          notes={<p>The <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">/api/v1/health</code> endpoint should return a simple status object. If the backend is down, you'll see a network error in the Inspector.</p>}
        >
          <button
            onClick={() => run('ping', ping)}
            className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Send Ping
          </button>
        </PlaygroundSection>

        <PlaygroundSection
          id="random"
          title="Random"
          description="GET request that returns randomized data on each call."
          learnCallout="Try clicking multiple times — each response is different. This demonstrates non-idempotent GET patterns."
          status={r('random').status}
          result={r('random').data}
          expectedResponse={{ ok: true, data: { value: 42, uuid: 'abc-123' } }}
        >
          <button
            onClick={() => run('random', random)}
            className="px-4 py-2 text-sm rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity"
          >
            Get Random
          </button>
        </PlaygroundSection>

        <PlaygroundSection
          id="toggle"
          title="Toggle"
          description="POST request that sends a boolean payload and receives confirmation."
          learnCallout="This shows how to send a JSON body with a POST. Check the Inspector to see the request payload."
          status={r('toggle').status}
          result={r('toggle').data}
          expectedResponse={{ ok: true, data: { value: true, toggled_at: '2024-01-01T00:00:00Z' } }}
          notes={<p>The toggle state is local — the backend simply echoes whatever value you send. This pattern is useful for testing POST request serialization.</p>}
        >
          <button
            onClick={() => {
              const next = !toggleVal;
              setToggleVal(next);
              run('toggle', () => toggle(next));
            }}
            className="px-4 py-2 text-sm rounded-md bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity"
          >
            Toggle → {toggleVal ? 'OFF' : 'ON'}
          </button>
        </PlaygroundSection>
      </div>
    </div>
  );
}
