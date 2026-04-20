import * as React from 'react';
import { cn } from '../lib/cn';

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed';
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, orientation = 'horizontal', variant = 'solid', ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === 'horizontal'
          ? 'w-full border-t-[1px] border-chekin-gray-3 h-0'
          : 'h-full border-l-[1px] border-chekin-gray-3 w-0',
        variant === 'dashed' && 'border-dashed',
        className,
      )}
      {...props}
    />
  ),
);
Divider.displayName = 'Divider';
