import * as React from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '../lib/cn';

export const Tabs = RadixTabs.Root;

export const TabsList = React.forwardRef<
  React.ElementRef<typeof RadixTabs.List>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.List>
>(({ className, ...props }, ref) => (
  <RadixTabs.List
    ref={ref}
    className={cn('inline-flex items-stretch gap-chekin-3 border-b border-chekin-gray-3', className)}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Trigger>
>(({ className, ...props }, ref) => (
  <RadixTabs.Trigger
    ref={ref}
    className={cn(
      'relative inline-flex items-center gap-[6px] h-10 px-[4px] -mb-px',
      'font-sans font-semibold text-[14px] leading-5 text-chekin-gray-1',
      'border-b-2 border-transparent transition-colors outline-none',
      'hover:text-chekin-navy',
      'focus-visible:shadow-chekin-focus rounded-[2px]',
      'data-[state=active]:text-chekin-navy data-[state=active]:border-chekin-blue',
      'data-[disabled]:opacity-30 data-[disabled]:pointer-events-none',
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof RadixTabs.Content>,
  React.ComponentPropsWithoutRef<typeof RadixTabs.Content>
>(({ className, ...props }, ref) => (
  <RadixTabs.Content
    ref={ref}
    className={cn('pt-chekin-3 outline-none focus-visible:shadow-chekin-focus rounded-[2px]', className)}
    {...props}
  />
));
TabsContent.displayName = 'TabsContent';
