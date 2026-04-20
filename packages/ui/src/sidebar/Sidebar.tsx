import * as React from 'react';
import { cn } from '../lib/cn';

type SidebarTone = 'light' | 'dark';

const ToneContext = React.createContext<SidebarTone>('light');

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional heading shown at the top. */
  heading?: React.ReactNode;
  subheading?: React.ReactNode;
  /**
   * Visual tone. `light` = white bg + navy text (section-scoped nav inside a page).
   * `dark` = navy bg + white/gray text (canonical global nav, 280px wide).
   * Default: `light`.
   */
  tone?: SidebarTone;
  /** Optional brand / logo slot shown in the top row instead of heading. */
  brand?: React.ReactNode;
  /** Optional footer content (e.g. account accordion). */
  footer?: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  ({ className, heading, subheading, tone = 'light', brand, footer, children, ...props }, ref) => {
    const isDark = tone === 'dark';
    return (
      <ToneContext.Provider value={tone}>
        <aside
          ref={ref}
          aria-label="Section navigation"
          className={cn(
            'flex flex-col h-full overflow-y-auto',
            isDark
              ? 'w-[280px] bg-chekin-navy text-white'
              : 'w-[264px] bg-white text-chekin-navy border-r border-chekin-gray-3',
            className,
          )}
          {...props}
        >
          {brand && (
            <div className={cn(
              'flex items-center justify-between h-16 px-chekin-2 shrink-0',
              isDark ? 'border-b border-white/10' : 'border-b border-chekin-gray-3',
            )}>
              {brand}
            </div>
          )}
          {(heading || subheading) && (
            <div className={cn(
              'px-chekin-3 pt-chekin-3 pb-chekin-2',
              isDark ? 'border-b border-white/10' : 'border-b border-chekin-gray-3',
            )}>
              {heading && (
                <h2 className={cn(
                  'font-sans font-semibold text-[16px] leading-5',
                  isDark ? 'text-white' : 'text-chekin-navy',
                )}>
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className={cn(
                  'font-sans text-[12px] leading-4 mt-[2px] truncate',
                  isDark ? 'text-chekin-gray-2' : 'text-chekin-gray-1',
                )}>
                  {subheading}
                </p>
              )}
            </div>
          )}
          <nav className="flex-1 flex flex-col gap-chekin-2 p-chekin-2 min-h-0">{children}</nav>
          {footer && (
            <div className={cn(
              'shrink-0 p-chekin-2',
              isDark ? 'border-t border-white/10' : 'border-t border-chekin-gray-3',
            )}>
              {footer}
            </div>
          )}
        </aside>
      </ToneContext.Provider>
    );
  },
);
Sidebar.displayName = 'Sidebar';

export interface SidebarSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
}

export const SidebarSection = React.forwardRef<HTMLDivElement, SidebarSectionProps>(
  ({ className, label, children, ...props }, ref) => {
    const tone = React.useContext(ToneContext);
    return (
      <div ref={ref} className={cn('flex flex-col gap-[2px]', className)} {...props}>
        {label && (
          <span className={cn(
            'px-[10px] pt-[6px] pb-[4px] font-sans font-semibold text-[11px] leading-4 uppercase tracking-wide',
            tone === 'dark' ? 'text-chekin-gray-1' : 'text-chekin-gray-2',
          )}>
            {label}
          </span>
        )}
        {children}
      </div>
    );
  },
);
SidebarSection.displayName = 'SidebarSection';

export interface SidebarItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  children: React.ReactNode;
}

export const SidebarItem = React.forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ className, icon, active, badge, children, type = 'button', ...props }, ref) => {
    const tone = React.useContext(ToneContext);
    const isDark = tone === 'dark';
    return (
      <button
        ref={ref}
        type={type}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'relative flex items-center gap-chekin-1 h-10 px-[12px]',
          'rounded-chekin-standard font-sans font-medium text-[14px] leading-5 text-left',
          'outline-none transition-colors',
          'focus-visible:shadow-chekin-focus',
          isDark
            ? active
              ? 'bg-[rgba(56,91,248,0.18)] text-white'
              : 'text-chekin-gray-2 hover:bg-white/5 hover:text-white'
            : active
              ? 'bg-chekin-surface-pressed text-chekin-blue'
              : 'text-chekin-navy hover:bg-chekin-surface-input-empty',
          className,
        )}
        {...props}
      >
        {icon && (
          <span
            className={cn(
              'inline-flex items-center justify-center shrink-0 w-5 h-5',
              isDark
                ? active ? 'text-white' : 'text-chekin-gray-2'
                : active ? 'text-chekin-blue' : 'text-chekin-gray-1',
            )}
          >
            {icon}
          </span>
        )}
        <span className="flex-1 truncate">{children}</span>
        {badge && <span className="shrink-0">{badge}</span>}
        {active && !isDark && (
          <span aria-hidden="true" className="absolute left-0 top-[6px] bottom-[6px] w-[2px] bg-chekin-blue rounded-r" />
        )}
      </button>
    );
  },
);
SidebarItem.displayName = 'SidebarItem';
