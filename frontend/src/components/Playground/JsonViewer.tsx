import { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, Check } from 'lucide-react';

interface JsonViewerProps {
  data: unknown;
  defaultOpen?: boolean;
  maxHeight?: string;
}

export function JsonViewer({ data, defaultOpen = true, maxHeight = '240px' }: JsonViewerProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);
  const text = JSON.stringify(data, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card">
      <div className="flex items-center justify-between px-3 py-1.5 bg-muted/40 border-b border-border">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          {open ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
          JSON
        </button>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      {open && (
        <pre
          className="p-3 overflow-auto font-mono text-xs text-foreground leading-relaxed whitespace-pre-wrap break-words"
          style={{ maxHeight }}
        >
          {text}
        </pre>
      )}
    </div>
  );
}
