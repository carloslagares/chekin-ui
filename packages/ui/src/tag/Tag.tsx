import * as React from 'react';
import { cn } from '../lib/cn';

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  onRemove?: () => void;
  removeLabel?: string;
}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, children, onRemove, removeLabel = 'Remove', ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center gap-[6px] h-6 pl-[10px] pr-[8px]',
        'bg-chekin-surface-input-empty border border-chekin-gray-3',
        'rounded-chekin-input font-sans font-medium text-[12px] leading-4 text-chekin-navy',
        className,
      )}
      {...props}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          className={cn(
            'inline-flex items-center justify-center w-[14px] h-[14px] rounded-full',
            'bg-chekin-blue text-white text-[10px] leading-none font-bold',
            'hover:bg-chekin-blue-hover focus-visible:shadow-chekin-focus outline-none',
          )}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
            <path d="M1 1 L7 7 M7 1 L1 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  ),
);
Tag.displayName = 'Tag';
