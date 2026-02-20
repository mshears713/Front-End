import { useState, type FormEvent } from 'react';
import { validateForm } from '@/lib/api/actions';
import { PageHeader } from '@/components/Playground/PageHeader';
import { PlaygroundSection, type PlaygroundStatus } from '@/components/Playground/PlaygroundSection';

export default function Forms() {
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [result, setResult] = useState<unknown>(undefined);
  const [status, setStatus] = useState<PlaygroundStatus>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await validateForm({ name: form.name, email: form.email, age: Number(form.age) || 0 });
      setResult(res);
      setStatus((res as any)?.ok === false ? 'error' : 'success');
    } catch {
      setResult('Request failed');
      setStatus('error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Forms"
        description="Submit structured data to a backend endpoint and inspect how the request body is serialized, validated, and returned."
      />

      <PlaygroundSection
        title="User Form Submission"
        description="A POST request with a JSON body. The backend validates the fields and returns either the created object or validation errors."
        learnCallout="Try submitting with missing fields or an invalid email — watch how the backend responds with error details."
        status={status}
        result={result}
        expectedResponse={{ ok: true, data: { id: 1, name: 'Jane', email: 'jane@example.com', age: 28 } }}
        notes={
          <>
            <p>The form posts to <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">POST /api/v1/users</code>.</p>
            <p>Fields: <code className="font-mono text-xs">name</code> (string), <code className="font-mono text-xs">email</code> (string), <code className="font-mono text-xs">age</code> (number).</p>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          {(['name', 'email', 'age'] as const).map((field) => (
            <div key={field}>
              <label className="block text-xs font-medium text-foreground mb-1 capitalize">{field}</label>
              <input
                type={field === 'age' ? 'number' : 'text'}
                value={form[field]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder={field === 'email' ? 'user@example.com' : field}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === 'loading' ? 'Submitting…' : 'Submit'}
          </button>
        </form>
      </PlaygroundSection>
    </div>
  );
}
