import * as React from 'react';
import { Tooltip } from '../tooltip/Tooltip';
import { cn } from '../lib/cn';

export interface HelpTooltipProps {
  content: React.ReactNode;
  className?: string;
  /** 16 (small inline) or 20 (larger, when shown alone). */
  size?: 16 | 20;
  label?: string;
}

export const HelpTooltip = ({
  content,
  className,
  size = 16,
  label = 'More info',
}: HelpTooltipProps) => (
  <Tooltip content={content}>
    <button
      type="button"
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center shrink-0 text-chekin-gray-2 hover:text-chekin-gray-1',
        'outline-none focus-visible:shadow-chekin-focus rounded-full',
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" />
        <path d="M6.2 6a1.8 1.8 0 0 1 3.5 .5c0 1-1.4 1.2-1.7 2-.1.2-.2.4-.2.7" strokeLinecap="round" />
        <circle cx="8" cy="11.6" r="0.7" fill="currentColor" stroke="none" />
      </svg>
    </button>
  </Tooltip>
);
