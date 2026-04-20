import * as React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cn } from '../lib/cn';

export const TooltipProvider = RadixTooltip.Provider;
export const TooltipRoot = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;
export const TooltipPortal = RadixTooltip.Portal;

export const TooltipContent = React.forwardRef<
  React.ElementRef<typeof RadixTooltip.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixTooltip.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 max-w-[260px] px-[10px] py-[6px] rounded-chekin-input',
      'bg-chekin-navy text-white font-sans text-[12px] leading-4',
      'shadow-chekin-dropdown',
      'data-[state=delayed-open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=delayed-open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = 'TooltipContent';

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delayDuration?: number;
  asChild?: boolean;
}

/**
 * Convenience wrapper — most usage wraps a trigger in a Tooltip with content.
 * For custom positioning or multiple triggers, compose the primitives above.
 */
export const Tooltip = ({ content, children, side = 'top', delayDuration = 200, asChild = true }: TooltipProps) => (
  <RadixTooltip.Provider delayDuration={delayDuration}>
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild={asChild}>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <TooltipContent side={side}>{content}</TooltipContent>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  </RadixTooltip.Provider>
);
