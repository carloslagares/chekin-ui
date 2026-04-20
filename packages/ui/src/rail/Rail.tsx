import * as React from 'react';
import { Tooltip } from '../tooltip/Tooltip';
import { cn } from '../lib/cn';

export interface RailProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional logo shown at the top. */
  logo?: React.ReactNode;
  /** Optional footer content (usually Avatar + settings). */
  footer?: React.ReactNode;
}

export const Rail = React.forwardRef<HTMLElement, RailProps>(
  ({ className, logo, footer, children, ...props }, ref) => (
    <aside
      ref={ref}
      aria-label="Primary navigation"
      className={cn(
        'flex flex-col w-14 h-full bg-white border-r border-chekin-gray-3',
        'py-chekin-2 gap-chekin-1',
        className,
      )}
      {...props}
    >
      {logo && <div className="flex items-center justify-center h-10 mb-chekin-2">{logo}</div>}
      <nav className="flex-1 flex flex-col items-center gap-[4px]">{children}</nav>
      {footer && <div className="flex flex-col items-center gap-[4px] pt-chekin-2">{footer}</div>}
    </aside>
  ),
);
Rail.displayName = 'Rail';

export interface RailItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
  asChild?: never;
  children: React.ReactNode;
  badge?: React.ReactNode;
}

export const RailItem = React.forwardRef<HTMLButtonElement, RailItemProps>(
  ({ className, label, active, children, badge, type = 'button', ...props }, ref) => (
    <Tooltip content={label} side="right">
      <button
        ref={ref}
        type={type}
        aria-label={label}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'relative inline-flex items-center justify-center w-10 h-10 rounded-chekin-input',
          'outline-none transition-colors',
          'focus-visible:shadow-chekin-focus',
          active
            ? 'bg-chekin-surface-pressed text-chekin-blue'
            : 'text-chekin-gray-1 hover:bg-chekin-surface-input-empty hover:text-chekin-navy',
          className,
        )}
        {...props}
      >
        {children}
        {badge && <span className="absolute top-[6px] right-[6px]">{badge}</span>}
      </button>
    </Tooltip>
  ),
);
RailItem.displayName = 'RailItem';
