import * as React from 'react';
import { cn } from '../lib/cn';

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional heading shown at the top. */
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, heading, subheading, children, ...props }, ref) => (
    <aside
      ref={ref}
      aria-label="Section navigation"
      className={cn(
        'flex flex-col w-[264px] h-full bg-white border-r border-chekin-gray-3',
        'overflow-y-auto',
        className,
      )}
      {...props}
    >
      {(heading || subheading) && (
        <div className="px-chekin-3 pt-chekin-3 pb-chekin-2 border-b border-chekin-gray-3">
          {heading && (
            <h2 className="font-sans font-semibold text-[16px] leading-5 text-chekin-navy">{heading}</h2>
          )}
          {subheading && (
            <p className="font-sans text-[12px] leading-4 text-chekin-gray-1 mt-[2px] truncate">{subheading}</p>
          )}
        </div>
      )}
      <nav className="flex-1 flex flex-col gap-chekin-2 p-chekin-2">{children}</nav>
    </aside>
  ),
);
Sidebar.displayName = 'Sidebar';

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

export const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, label, children, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col gap-[2px]', className)} {...props}>
      {label && (
        <span className="px-[10px] pt-[6px] pb-[4px] font-sans font-semibold text-[11px] leading-4 uppercase tracking-wide text-chekin-gray-2">
          {label}
        </span>
      )}
      {children}
    </div>
  ),
);
SidebarSection.displayName = 'SidebarSection';

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, active, badge, children, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative flex items-center gap-chekin-1 h-9 px-[10px]',
        'rounded-chekin-input font-sans font-medium text-[13px] leading-5 text-left',
        'outline-none transition-colors',
        'focus-visible:shadow-chekin-focus',
        active
          ? 'bg-chekin-surface-pressed text-chekin-blue'
          : 'text-chekin-navy hover:bg-chekin-surface-input-empty',
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            'inline-flex items-center justify-center shrink-0 w-[18px] h-[18px]',
            active ? 'text-chekin-blue' : 'text-chekin-gray-1',
          )}
        >
          {icon}
        </span>
      )}
      <span className="flex-1 truncate">{children}</span>
      {badge && <span className="shrink-0">{badge}</span>}
      {active && <span aria-hidden="true" className="absolute left-0 top-[6px] bottom-[6px] w-[2px] bg-chekin-blue rounded-r" />}
    </button>
  ),
);
SidebarItem.displayName = 'SidebarItem';
