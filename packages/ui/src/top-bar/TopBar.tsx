import * as React from 'react';
import { cn } from '../lib/cn';

export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  /** Make the TopBar stick to the top of the content area on scroll. Default true. */
  sticky?: boolean;
}

export const TopBar = React.forwardRef<HTMLElement, TopBarProps>(
  ({ className, sticky = true, children, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(
        'flex items-center gap-chekin-2 h-16 px-chekin-3',
        'bg-white border-b border-chekin-gray-3',
        sticky && 'sticky top-0 z-10',
        className,
      )}
      {...props}
    >
      {children}
    </header>
  ),
);
TopBar.displayName = 'TopBar';
