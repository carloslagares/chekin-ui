import * as React from 'react';
import { cn } from '../lib/cn';

export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  selected?: boolean;
  onRemove?: () => void;
  count?: number;
  leftIcon?: React.ReactNode;
}

export const Chip = React.forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, children, selected, onRemove, count, leftIcon, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={cn(
        'inline-flex items-center gap-[6px] h-8 px-[10px]',
        'rounded-chekin-input border font-sans font-medium text-[13px] leading-4',
        'outline-none transition-colors cursor-pointer',
        'focus-visible:shadow-chekin-focus',
        selected
          ? 'bg-chekin-surface-pressed border-chekin-blue text-chekin-blue'
          : 'bg-white border-chekin-gray-3 text-chekin-navy hover:bg-chekin-surface-input-empty',
        className,
      )}
      {...props}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {typeof count === 'number' && (
        <span className="font-sans font-semibold text-[11px] leading-4 text-chekin-gray-1 tabular-nums">
          {count}
        </span>
      )}
      {onRemove && (
        <span
          role="button"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="inline-flex items-center justify-center w-[14px] h-[14px] rounded-full bg-chekin-blue text-white"
          aria-label="Remove"
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
            <path d="M1 1 L7 7 M7 1 L1 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      )}
    </button>
  ),
);
Chip.displayName = 'Chip';
