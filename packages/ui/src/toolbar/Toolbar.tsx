import * as React from 'react';
import { cn } from '../lib/cn';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Show/hide with slide animation controlled by this prop. */
  open?: boolean;
  /** Number of selected items (shown in the left slot). */
  selectedCount?: number;
  /** Action buttons (right slot). */
  actions?: React.ReactNode;
  /** Click handler for the close (×) button. */
  onClose?: () => void;
  /** Optional extra content between count and actions. */
  children?: React.ReactNode;
}

export const Toolbar = React.forwardRef<HTMLDivElement, ToolbarProps>(
  ({ className, open = true, selectedCount, actions, onClose, children, ...props }, ref) => {
    if (!open) return null;
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-label="Bulk actions"
        className={cn(
          'flex items-center gap-chekin-2 px-chekin-2 py-[10px]',
          'bg-chekin-navy text-white rounded-chekin-standard shadow-chekin-dropdown',
          className,
        )}
        {...props}
      >
        {typeof selectedCount === 'number' && (
          <span className="font-sans font-semibold text-[13px] leading-5">
            {selectedCount} selected
          </span>
        )}
        {children}
        <div className="ml-auto flex items-center gap-chekin-1">
          {actions}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Clear selection"
              className="inline-flex items-center justify-center w-7 h-7 rounded-chekin-input text-white/70 hover:text-white hover:bg-white/10 outline-none focus-visible:shadow-chekin-focus"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
                <path d="M2 2 L10 10 M10 2 L2 10" />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  },
);
Toolbar.displayName = 'Toolbar';
