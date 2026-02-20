import { useState, useRef } from 'react';
import { startJob, getJob } from '@/lib/api/actions';
import { PageHeader } from '@/components/Playground/PageHeader';
import { PlaygroundSection, type PlaygroundStatus } from '@/components/Playground/PlaygroundSection';

export default function Jobs() {
  const [pgStatus, setPgStatus] = useState<PlaygroundStatus>('idle');
  const [jobStatus, setJobStatus] = useState('idle');
  const [log, setLog] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const append = (msg: string) =>
    setLog((l) => [...l, `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] ${msg}`]);

  const handleStart = async () => {
    setLog([]);
    setJobStatus('starting');
    setPgStatus('loading');
    append('Starting job…');

    const res = await startJob();
    if (!res.ok) {
      setJobStatus('error');
      setPgStatus('error');
      append(`Error: ${res.error}`);
      return;
    }

    const jobId = (res.data as { job_id?: string })?.job_id ?? 'unknown';
    setJobStatus('polling');
    append(`Job created: ${jobId}. Polling…`);

    let polls = 0;
    timerRef.current = setInterval(async () => {
      polls++;
      const poll = await getJob(jobId);
      const s = (poll.data as { status?: string })?.status ?? poll.error ?? 'unknown';
      append(`Poll #${polls}: ${s}`);

      if (s === 'completed' || s === 'failed' || polls >= 10) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        setJobStatus(s === 'completed' ? 'done' : 'error');
        setPgStatus(s === 'completed' ? 'success' : 'error');
        append(polls >= 10 ? 'Max polls reached. Stopped.' : `Final: ${s}`);
      }
    }, 2000);
  };

  const handleStop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setJobStatus('idle');
    setPgStatus('idle');
    append('Stopped manually.');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Async Jobs"
        description="Start a background job, then poll for its status until completion. This demonstrates long-running task patterns with periodic status checks."
      />

      <PlaygroundSection
        title="Job Runner"
        description="Starts a job via POST, then polls GET every 2 seconds for status updates. Stops automatically when completed, failed, or after 10 polls."
        learnCallout="Watch the Inspector — you'll see the initial POST followed by a series of GET polls. This is a common pattern for async backend operations like file processing or report generation."
        status={pgStatus}
        expectedResponse={{
          start: { ok: true, data: { id: 'job_abc123', status: 'pending' } },
          poll: { ok: true, data: { id: 'job_abc123', status: 'completed', result: {} } },
        }}
        notes={
          <>
            <p><strong className="text-foreground">Start:</strong> <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">POST /api/v1/health/jobs</code></p>
            <p><strong className="text-foreground">Poll:</strong> <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">GET /api/v1/health/jobs/:id</code></p>
            <p>The polling interval is 2 seconds. Max 10 polls before automatic stop.</p>
          </>
        }
      >
        <div className="space-y-4">
          <div className="flex gap-3 items-center">
            <button
              onClick={handleStart}
              disabled={jobStatus === 'polling'}
              className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              Start Job
            </button>
            {jobStatus === 'polling' && (
              <button
                onClick={handleStop}
                className="px-4 py-2 text-sm rounded-md bg-destructive text-destructive-foreground hover:opacity-90"
              >
                Stop
              </button>
            )}
            <span className="text-xs font-mono text-muted-foreground">Status: {jobStatus}</span>
          </div>

          {log.length > 0 && (
            <pre className="text-xs font-mono bg-muted/30 border border-border rounded-lg p-3 overflow-y-auto max-h-60 whitespace-pre-wrap leading-relaxed">
              {log.join('\n')}
            </pre>
          )}
        </div>
      </PlaygroundSection>
    </div>
  );
}
