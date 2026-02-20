import { NavLink } from 'react-router-dom';
import { Home, Layers, Zap, FileInput, List, Cog } from 'lucide-react';

const navItems = [
{ to: '/', label: 'Home', icon: Home },
{ to: '/frameworks', label: 'Frameworks Overview', icon: Layers },
{ to: '/api-basics', label: 'API Basics', icon: Zap },
{ to: '/forms', label: 'Forms', icon: FileInput },
{ to: '/items', label: 'Items', icon: List },
{ to: '/jobs', label: 'Jobs', icon: Cog }];


export function Sidebar() {
  return (
    <aside className="w-60 shrink-0 h-screen sticky top-0 flex flex-col border-r border-border bg-card overflow-y-auto">
      <div className="px-5 py-5 border-b border-border">
        <span className="font-mono text-sm font-semibold tracking-tight text-primary">
          api-demo
        </span>
        <span className="font-mono text-xs text-muted-foreground ml-1">v1</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) =>
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
          `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
          isActive ?
          'bg-primary/10 text-primary font-medium' :
          'text-muted-foreground hover:text-foreground hover:bg-muted'}`

          }>

            <item.icon className="h-4 w-4 shrink-0" />
            <span>{item.label}</span>
          </NavLink>
        )}
      </nav>

      <div className="px-5 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground font-mono">
          localhost:8000
        </p>
      </div>
    </aside>);

}