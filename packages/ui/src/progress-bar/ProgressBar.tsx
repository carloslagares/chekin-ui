import * as React from 'react';
import { cn } from '../lib/cn';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  label?: React.ReactNode;
  showValue?: boolean;
  tone?: 'brand' | 'success' | 'warn' | 'error';
  size?: 's' | 'm';
}

const toneColor: Record<NonNullable<ProgressBarProps['tone']>, string> = {
  brand: 'bg-chekin-blue',
  success: 'bg-[#0F9F80]',
  warn: 'bg-[#B86A00]',
  error: 'bg-chekin-red',
};

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ className, value, max = 100, label, showValue, tone = 'brand', size = 'm', ...props }, ref) => {
    const pct = Math.max(0, Math.min(100, (value / max) * 100));
    const heightClass = size === 's' ? 'h-[4px]' : 'h-[8px]';

    return (
      <div ref={ref} className={cn('flex flex-col gap-[6px]', className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between items-baseline">
            {label && (
              <span className="font-sans font-medium text-[13px] leading-4 text-chekin-navy">
                {label}
              </span>
            )}
            {showValue && (
              <span className="font-sans font-semibold text-[12px] leading-4 text-chekin-gray-1 tabular-nums">
                {Math.round(pct)}%
              </span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={value}
          className={cn('w-full rounded-full bg-chekin-gray-3 overflow-hidden', heightClass)}
        >
          <div
            className={cn('h-full rounded-full transition-all', toneColor[tone])}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  },
);
ProgressBar.displayName = 'ProgressBar';
