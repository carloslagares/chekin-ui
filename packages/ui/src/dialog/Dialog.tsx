import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { cn } from '../lib/cn';

export const Dialog = RadixDialog.Root;
export const DialogTrigger = RadixDialog.Trigger;
export const DialogPortal = RadixDialog.Portal;
export const DialogClose = RadixDialog.Close;

export const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ className, ...props }, ref) => (
  <RadixDialog.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-40 bg-chekin-navy/50 backdrop-blur-[1px]',
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogOverlay.displayName = 'DialogOverlay';

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Content>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Content> & { size?: 's' | 'm' | 'l' }
>(({ className, children, size = 'm', ...props }, ref) => {
  const width = size === 's' ? 'max-w-[440px]' : size === 'l' ? 'max-w-[800px]' : 'max-w-[560px]';
  return (
    <DialogPortal>
      <DialogOverlay />
      <RadixDialog.Content
        ref={ref}
        className={cn(
          'fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-[92vw] max-h-[85vh] overflow-auto',
          width,
          'bg-white rounded-chekin-standard shadow-chekin-dropdown',
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
          className,
        )}
        {...props}
      >
        {children}
        <DialogClose
          aria-label="Close"
          className="absolute top-chekin-2 right-chekin-2 inline-flex items-center justify-center w-8 h-8 rounded-chekin-input text-chekin-gray-1 hover:bg-chekin-surface-input-empty outline-none focus-visible:shadow-chekin-focus"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            <path d="M2 2 L12 12 M12 2 L2 12" />
          </svg>
        </DialogClose>
      </RadixDialog.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = 'DialogContent';

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-[4px] px-chekin-3 pt-chekin-3 pb-chekin-2 pr-chekin-5 border-b border-chekin-gray-3', className)} {...props} />
);

export const DialogTitle = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Title>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Title>
>(({ className, ...props }, ref) => (
  <RadixDialog.Title ref={ref} className={cn('font-sans font-semibold text-[18px] leading-6 text-chekin-navy', className)} {...props} />
));
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Description>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Description>
>(({ className, ...props }, ref) => (
  <RadixDialog.Description ref={ref} className={cn('font-sans text-[13px] leading-5 text-chekin-gray-1', className)} {...props} />
));
DialogDescription.displayName = 'DialogDescription';

export const DialogBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('px-chekin-3 py-chekin-2 font-sans text-[14px] leading-5 text-chekin-navy', className)} {...props} />
);

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center justify-end gap-chekin-1 px-chekin-3 pt-chekin-2 pb-chekin-3 border-t border-chekin-gray-3', className)} {...props} />
);
