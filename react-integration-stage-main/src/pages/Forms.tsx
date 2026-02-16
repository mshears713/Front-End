import { useState, type FormEvent } from 'react';
import { validateForm } from '@/lib/api/actions';

export default function Forms() {
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [result, setResult] = useState<unknown>(undefined);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await validateForm({ name: form.name, email: form.email, age: Number(form.age) || 0 });
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground tracking-tight">Forms</h1>
      <p className="text-sm text-muted-foreground">Submit and inspect the request/response.</p>

      <form onSubmit={handleSubmit} className="space-y-3">
        {(['name', 'email', 'age'] as const).map((field) => (
          <div key={field}>
            <label className="block text-xs font-medium text-foreground mb-1 capitalize">{field}</label>
            <input
              type={field === 'age' ? 'number' : 'text'}
              value={form[field]}
              onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
              className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder={field}
            />
          </div>
        ))}
        <button type="submit" disabled={loading} className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? 'Submitting…' : 'Submit'}
        </button>
      </form>

      {result !== undefined && (
        <pre className="text-xs font-mono bg-card border border-border rounded p-3 overflow-x-auto max-h-40">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
}
