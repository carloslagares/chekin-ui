import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { cn } from '../lib/cn';

export const Accordion = RadixAccordion.Root;

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Item>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Item>
>(({ className, ...props }, ref) => (
  <RadixAccordion.Item
    ref={ref}
    className={cn('border border-chekin-gray-3 rounded-chekin-standard bg-white overflow-hidden', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Header className="flex">
    <RadixAccordion.Trigger
      ref={ref}
      className={cn(
        'flex flex-1 items-center justify-between gap-chekin-2 px-chekin-3 py-chekin-2',
        'font-sans font-semibold text-[14px] leading-5 text-chekin-navy text-left',
        'outline-none transition-colors hover:bg-chekin-surface-input-empty',
        'focus-visible:shadow-chekin-focus',
        '[&[data-state=open]>svg]:rotate-180',
        className,
      )}
      {...props}
    >
      {children}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-chekin-gray-1 transition-transform duration-150" aria-hidden="true">
        <path d="M3 5 L7 9 L11 5" />
      </svg>
    </RadixAccordion.Trigger>
  </RadixAccordion.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof RadixAccordion.Content>,
  React.ComponentPropsWithoutRef<typeof RadixAccordion.Content>
>(({ className, children, ...props }, ref) => (
  <RadixAccordion.Content
    ref={ref}
    className={cn(
      'overflow-hidden border-t border-chekin-gray-3',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:slide-out-to-top-1 data-[state=open]:slide-in-from-top-1',
      className,
    )}
    {...props}
  >
    <div className="px-chekin-3 py-chekin-2 font-sans text-[13px] leading-5 text-chekin-navy">
      {children}
    </div>
  </RadixAccordion.Content>
));
AccordionContent.displayName = 'AccordionContent';
