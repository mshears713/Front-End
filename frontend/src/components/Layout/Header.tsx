import { Terminal, PanelRightOpen, PanelRightClose } from 'lucide-react';
import { useApiInspector } from '@/contexts/ApiInspectorContext';

export function Header() {
  const { logs, isOpen, setIsOpen } = useApiInspector();

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6 shrink-0">
      <div className="flex items-center gap-2">
        <Terminal className="h-4 w-4 text-primary" />
        <h1 className="text-sm font-medium text-foreground">
          Frontend ↔ Backend Integration Patterns
        </h1>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      >
        {isOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
        <span>Inspector</span>
        {logs.length > 0 && (
          <span className="bg-primary/15 text-primary px-1.5 py-0.5 rounded text-[10px] font-semibold">
            {logs.length}
          </span>
        )}
      </button>
    </header>
  );
}
