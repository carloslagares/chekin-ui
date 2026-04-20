import * as React from 'react';
import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { cn } from '../lib/cn';

export const DropdownMenu = RadixMenu.Root;
export const DropdownMenuTrigger = RadixMenu.Trigger;
export const DropdownMenuPortal = RadixMenu.Portal;
export const DropdownMenuGroup = RadixMenu.Group;

export const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof RadixMenu.Content>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.Content>
>(({ className, sideOffset = 6, ...props }, ref) => (
  <RadixMenu.Portal>
    <RadixMenu.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 min-w-[180px] p-[4px] rounded-chekin-standard',
        'bg-white border border-chekin-gray-3 shadow-chekin-dropdown',
        'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    />
  </RadixMenu.Portal>
));
DropdownMenuContent.displayName = 'DropdownMenuContent';

const itemCls = [
  'relative flex items-center gap-chekin-1 h-8 px-[10px] rounded-chekin-input cursor-pointer select-none',
  'font-sans text-[14px] leading-5 text-chekin-navy outline-none',
  'data-[highlighted]:bg-chekin-surface-pressed data-[highlighted]:text-chekin-blue',
  'data-[disabled]:opacity-30 data-[disabled]:pointer-events-none',
];

export const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof RadixMenu.Item>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.Item>
>(({ className, ...props }, ref) => (
  <RadixMenu.Item ref={ref} className={cn(itemCls, className)} {...props} />
));
DropdownMenuItem.displayName = 'DropdownMenuItem';

export const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof RadixMenu.Label>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.Label>
>(({ className, ...props }, ref) => (
  <RadixMenu.Label
    ref={ref}
    className={cn('px-[10px] py-[6px] font-sans text-[11px] leading-4 uppercase tracking-wide text-chekin-gray-2', className)}
    {...props}
  />
));
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

export const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof RadixMenu.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixMenu.Separator>
>(({ className, ...props }, ref) => (
  <RadixMenu.Separator ref={ref} className={cn('my-[4px] h-px bg-chekin-gray-3', className)} {...props} />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';
