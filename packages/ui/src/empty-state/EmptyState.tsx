import * as React from 'react';
import { cn } from '../lib/cn';

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex flex-col items-center justify-center gap-chekin-2 text-center',
        'px-chekin-4 py-chekin-5 max-w-[440px] mx-auto',
        className,
      )}
      {...props}
    >
      {icon && (
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-chekin-surface-input-empty text-chekin-gray-1 mb-chekin-1">
          {icon}
        </div>
      )}
      <h3 className="font-sans font-semibold text-[18px] leading-6 text-chekin-navy">{title}</h3>
      {description && (
        <p className="font-sans text-[14px] leading-5 text-chekin-gray-1">{description}</p>
      )}
      {action && <div className="mt-chekin-1">{action}</div>}
    </div>
  ),
);
EmptyState.displayName = 'EmptyState';
