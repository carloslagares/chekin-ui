import * as React from 'react';
import { cn } from '../lib/cn';

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left-most icon-only nav (56px). Optional. */
  rail?: React.ReactNode;
  /** Secondary section nav (264px). Optional. */
  sidebar?: React.ReactNode;
  /** Right-side panel (e.g. AIPanel). Optional. */
  aside?: React.ReactNode;
  /** Main content (top bar + page). */
  children?: React.ReactNode;
  /** Canvas background colour override. Default canonical dashboard off-white. */
  background?: string;
}

/**
 * Production shell composition: Rail | Sidebar | Main | Aside
 * (any column is optional). Full viewport height; Main content scrolls
 * independently so Rail/Sidebar/Aside stay visible.
 */
export const AppShell = React.forwardRef<HTMLDivElement, AppShellProps>(
  ({ className, rail, sidebar, aside, children, background = '#FDFDFF', ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex h-screen w-full overflow-hidden', className)}
      style={{ backgroundColor: background, ...props.style }}
      {...props}
    >
      {rail && <div className="shrink-0">{rail}</div>}
      {sidebar && <div className="shrink-0">{sidebar}</div>}
      <main className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
      {aside && <div className="shrink-0 border-l border-chekin-gray-3 bg-white">{aside}</div>}
    </div>
  ),
);
AppShell.displayName = 'AppShell';
