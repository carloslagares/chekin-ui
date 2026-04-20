import * as React from 'react';
import { Button, type ButtonProps } from '../button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../dropdown-menu/DropdownMenu';
import { cn } from '../lib/cn';

export interface SplitButtonProps
  extends Omit<ButtonProps, 'rightIcon' | 'asChild' | 'shape'> {
  /** Menu content. Typically <DropdownMenuItem>s. */
  menu: React.ReactNode;
  /** Aria label for the chevron trigger. Default "More actions". */
  menuLabel?: string;
}

/**
 * Primary action + attached dropdown chevron.
 * [ Send check-in link | v ]
 * Sizing / variant / shape follow Button. The chevron side always uses the
 * same variant as the primary side but with a subtle separator.
 */
export const SplitButton = React.forwardRef<HTMLButtonElement, SplitButtonProps>(
  (
    {
      menu,
      menuLabel = 'More actions',
      variant = 'primary',
      size = 'm',
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const h = size === 'm' ? 'h-10' : size === 's' ? 'h-8' : 'h-6';
    return (
      <div className={cn('inline-flex', h, className)}>
        <Button
          ref={ref}
          variant={variant}
          size={size}
          className="rounded-r-none pr-chekin-2"
          {...rest}
        >
          {children}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={variant}
              size={size}
              aria-label={menuLabel}
              className="rounded-l-none px-[10px] border-l border-white/20"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 4.5 L6 7.5 L9 4.5" />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">{menu}</DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
);
SplitButton.displayName = 'SplitButton';
