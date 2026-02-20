import { useEffect, type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ApiInspector } from '@/components/ApiInspector/ApiInspector';
import { useApiInspector } from '@/contexts/ApiInspectorContext';
import { bindInspector } from '@/lib/api/client';

export function AppLayout({ children }: { children: ReactNode }) {
  const { pushLog } = useApiInspector();

  useEffect(() => {
    bindInspector(pushLog);
  }, [pushLog]);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
      <ApiInspector />
    </div>
  );
}
