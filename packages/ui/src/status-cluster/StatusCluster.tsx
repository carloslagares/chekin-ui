import * as React from 'react';
import { Tooltip } from '../tooltip/Tooltip';
import { cn } from '../lib/cn';

export type StatusClusterItemStatus = 'ok' | 'pending' | 'warn' | 'error' | 'idle';

export interface StatusClusterItem {
  label: string;
  status: StatusClusterItemStatus;
  /** Optional icon to show inside the dot. */
  icon?: React.ReactNode;
}

export interface StatusClusterProps extends React.HTMLAttributes<HTMLDivElement> {
  items: StatusClusterItem[];
  /** Size of each dot in px. Default 24. */
  size?: number;
}

const statusStyles: Record<StatusClusterItemStatus, string> = {
  ok: 'bg-[#E8FCF7] text-[#0F9F80]',
  pending: 'bg-[#FFF4E5] text-[#B86A00]',
  warn: 'bg-[#FFF4E5] text-[#B86A00]',
  error: 'bg-[#FFE8EF] text-chekin-red',
  idle: 'bg-chekin-surface-input-empty text-chekin-gray-1',
};

export const StatusCluster = React.forwardRef<HTMLDivElement, StatusClusterProps>(
  ({ className, items, size = 24, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center gap-[3px] p-[3px] bg-chekin-surface-input-empty rounded-chekin-input',
        className,
      )}
      {...props}
    >
      {items.map((item, i) => (
        <Tooltip key={i} content={item.label}>
          <span
            aria-label={item.label}
            className={cn(
              'inline-flex items-center justify-center rounded-chekin-input cursor-help',
              statusStyles[item.status],
            )}
            style={{ width: size, height: size }}
          >
            {item.icon ?? <DefaultIcon status={item.status} />}
          </span>
        </Tooltip>
      ))}
    </div>
  ),
);
StatusCluster.displayName = 'StatusCluster';

function DefaultIcon({ status }: { status: StatusClusterItemStatus }) {
  if (status === 'ok') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2.5 6.5 L5 9 L9.5 3.5" />
      </svg>
    );
  }
  if (status === 'error') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M3 3 L9 9 M9 3 L3 9" />
      </svg>
    );
  }
  if (status === 'warn' || status === 'pending') {
    return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="6" cy="6" r="4" />
        <path d="M6 4 V7" />
        <circle cx="6" cy="8.5" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return <span className="w-[6px] h-[6px] rounded-full bg-current" aria-hidden="true" />;
}
