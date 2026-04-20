import * as React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { cn } from '../lib/cn';

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;
export const PopoverPortal = RadixPopover.Portal;
export const PopoverClose = RadixPopover.Close;

export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof RadixPopover.Content>,
  React.ComponentPropsWithoutRef<typeof RadixPopover.Content>
>(({ className, sideOffset = 8, align = 'start', ...props }, ref) => (
  <RadixPopover.Portal>
    <RadixPopover.Content
      ref={ref}
      sideOffset={sideOffset}
      align={align}
      className={cn(
        'z-50 rounded-chekin-standard bg-white border border-chekin-gray-3 shadow-chekin-dropdown',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  </RadixPopover.Portal>
));
PopoverContent.displayName = 'PopoverContent';
