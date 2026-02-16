import { useState, useRef } from 'react';
import { startJob, getJob } from '@/lib/api/actions';

export default function Jobs() {
  const [status, setStatus] = useState('idle');
  const [log, setLog] = useState<string[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const append = (msg: string) => setLog((l) => [...l, `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] ${msg}`]);

  const handleStart = async () => {
    setLog([]);
    setStatus('starting');
    append('Starting job…');

    const res = await startJob();
    if (!res.ok) {
      setStatus('error');
      append(`Error: ${res.error}`);
      return;
    }

    const jobId = (res.data as { id?: string })?.id ?? 'unknown';
    setStatus('polling');
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
        setStatus(s === 'completed' ? 'done' : 'error');
        append(polls >= 10 ? 'Max polls reached. Stopped.' : `Final: ${s}`);
      }
    }, 2000);
  };

  const handleStop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setStatus('idle');
    append('Stopped manually.');
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground tracking-tight">Jobs</h1>
      <p className="text-sm text-muted-foreground">Async job demo — start, poll, complete.</p>

      <div className="flex gap-3">
        <button
          onClick={handleStart}
          disabled={status === 'polling'}
          className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50"
        >
          Start Job
        </button>
        {status === 'polling' && (
          <button onClick={handleStop} className="px-4 py-2 text-sm rounded-md bg-destructive text-destructive-foreground hover:opacity-90">
            Stop
          </button>
        )}
      </div>

      <p className="text-xs font-mono text-muted-foreground">Status: {status}</p>

      {log.length > 0 && (
        <pre className="text-xs font-mono bg-card border border-border rounded p-3 overflow-y-auto max-h-60 whitespace-pre-wrap">
          {log.join('\n')}
        </pre>
      )}
    </div>
  );
}
