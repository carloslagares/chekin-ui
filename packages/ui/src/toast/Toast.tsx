import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

export const ToastProvider = RadixToast.Provider;

export const ToastViewport = React.forwardRef<
  React.ElementRef<typeof RadixToast.Viewport>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Viewport>
>(({ className, ...props }, ref) => (
  <RadixToast.Viewport
    ref={ref}
    className={cn(
      'fixed z-50 bottom-chekin-4 right-chekin-4 flex flex-col gap-chekin-1 w-[360px] max-w-full outline-none',
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = 'ToastViewport';

const toastVariants = cva(
  [
    'relative flex items-start gap-chekin-2 p-chekin-3 pr-chekin-4',
    'bg-white border rounded-chekin-standard shadow-chekin-dropdown',
    'data-[state=open]:animate-in data-[state=closed]:animate-out',
    'data-[state=open]:slide-in-from-right-full data-[state=closed]:slide-out-to-right-full',
  ],
  {
    variants: {
      tone: {
        info: 'border-chekin-gray-3',
        success: 'border-[#0F9F80]',
        warn: 'border-[#B86A00]',
        error: 'border-chekin-red',
      },
    },
    defaultVariants: { tone: 'info' },
  },
);

export interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof RadixToast.Root>,
    VariantProps<typeof toastVariants> {}

export const Toast = React.forwardRef<
  React.ElementRef<typeof RadixToast.Root>,
  ToastProps
>(({ className, tone, ...props }, ref) => (
  <RadixToast.Root ref={ref} className={cn(toastVariants({ tone }), className)} {...props} />
));
Toast.displayName = 'Toast';

export const ToastTitle = React.forwardRef<
  React.ElementRef<typeof RadixToast.Title>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Title>
>(({ className, ...props }, ref) => (
  <RadixToast.Title ref={ref} className={cn('font-sans font-semibold text-[14px] leading-5 text-chekin-navy', className)} {...props} />
));
ToastTitle.displayName = 'ToastTitle';

export const ToastDescription = React.forwardRef<
  React.ElementRef<typeof RadixToast.Description>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Description>
>(({ className, ...props }, ref) => (
  <RadixToast.Description ref={ref} className={cn('font-sans text-[13px] leading-5 text-chekin-gray-1 mt-[2px]', className)} {...props} />
));
ToastDescription.displayName = 'ToastDescription';

export const ToastAction = RadixToast.Action;

export const ToastClose = React.forwardRef<
  React.ElementRef<typeof RadixToast.Close>,
  React.ComponentPropsWithoutRef<typeof RadixToast.Close>
>(({ className, ...props }, ref) => (
  <RadixToast.Close
    ref={ref}
    aria-label="Close"
    className={cn(
      'absolute top-[10px] right-[10px] inline-flex items-center justify-center w-6 h-6 rounded-chekin-input text-chekin-gray-1 hover:bg-chekin-surface-input-empty outline-none focus-visible:shadow-chekin-focus',
      className,
    )}
    {...props}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <path d="M2 2 L10 10 M10 2 L2 10" />
    </svg>
  </RadixToast.Close>
));
ToastClose.displayName = 'ToastClose';
