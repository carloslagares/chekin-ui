import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const iconButtonVariants = cva(
  [
    'relative inline-flex items-center justify-center shrink-0',
    'transition-colors duration-150 ease-out outline-none',
    'disabled:opacity-30 disabled:pointer-events-none',
    'focus-visible:shadow-chekin-focus',
  ],
  {
    variants: {
      size: {
        s: 'w-8 h-8',
        m: 'w-10 h-10',
        l: 'w-[43px] h-[43px]',
      },
      shape: {
        rounded: 'rounded-chekin-input',
        circle: 'rounded-full',
      },
      variant: {
        primary: 'bg-chekin-blue text-white hover:brightness-95',
        secondary: 'bg-white text-chekin-navy border border-chekin-gray-3 hover:bg-chekin-surface-input-empty',
        ghost: 'bg-transparent text-chekin-gray-1 hover:bg-chekin-surface-input-empty',
        danger: 'bg-white text-chekin-red border border-chekin-gray-3 hover:bg-[#FFE8EF]',
      },
    },
    defaultVariants: { size: 'm', shape: 'rounded', variant: 'secondary' },
  },
);

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof iconButtonVariants> {
  label: string;
  children: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size, shape, variant, label, children, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      className={cn(iconButtonVariants({ size, shape, variant }), className)}
      {...props}
    >
      {children}
    </button>
  ),
);
IconButton.displayName = 'IconButton';
