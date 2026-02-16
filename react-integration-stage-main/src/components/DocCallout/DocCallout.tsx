import { Info, AlertTriangle, CheckCircle } from 'lucide-react';
import type { ReactNode } from 'react';

type Variant = 'info' | 'warning' | 'success';

const variants: Record<Variant, { icon: typeof Info; classes: string }> = {
  info: { icon: Info, classes: 'border-primary/30 bg-primary/5 text-primary' },
  warning: { icon: AlertTriangle, classes: 'border-[hsl(var(--method-put))]/30 bg-[hsl(var(--method-put))]/5 text-[hsl(var(--method-put))]' },
  success: { icon: CheckCircle, classes: 'border-[hsl(var(--method-get))]/30 bg-[hsl(var(--method-get))]/5 text-[hsl(var(--method-get))]' },
};

export function DocCallout({ variant = 'info', children }: { variant?: Variant; children: ReactNode }) {
  const v = variants[variant];
  const Icon = v.icon;

  return (
    <div className={`flex gap-3 px-4 py-3 rounded-lg border ${v.classes}`}>
      <Icon className="h-4 w-4 mt-0.5 shrink-0" />
      <div className="text-sm">{children}</div>
    </div>
  );
}
