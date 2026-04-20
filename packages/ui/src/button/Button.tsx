import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const buttonVariants = cva(
  // Base: layout + text + focus ring + disabled opacity + overlay pseudo
  [
    'relative inline-flex items-center justify-center gap-chekin-1',
    'font-sans font-semibold',
    'transition-colors duration-150 ease-out',
    'outline-none',
    'disabled:opacity-30 disabled:pointer-events-none',
    'focus-visible:shadow-chekin-focus',
    // Overlay layer for hover / active (white-lighten or black-darken)
    'before:content-[""] before:absolute before:inset-0 before:rounded-[inherit]',
    'before:bg-white/0 before:transition-colors before:duration-150',
    'hover:before:bg-white/10 active:before:bg-black/10',
    '[&>*]:relative [&>*]:z-[1]',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-chekin-blue text-white',
          'focus-visible:ring-1 focus-visible:ring-chekin-navy focus-visible:ring-inset',
        ],
        secondary: [
          'bg-white/30 text-chekin-navy',
          'shadow-chekin-subtle-outline',
        ],
        tertiary: [
          'bg-transparent text-white border border-white',
          'shadow-chekin-subtle-outline',
        ],
        destructive: [
          'bg-chekin-red text-white',
        ],
      },
      size: {
        m: 'h-10 px-chekin-2 text-[14px]',
        s: 'h-8 px-[12px] text-[13px]',
        xs: 'h-6 px-[10px] text-[12px]',
      },
      shape: {
        rounded: 'rounded-chekin-input',
        pill: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'm',
      shape: 'rounded',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      shape,
      asChild = false,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(buttonVariants({ variant, size, shape }), className)}
        {...props}
      >
        <span className="inline-flex items-center gap-chekin-1">
          {loading ? <Spinner /> : leftIcon}
          {children}
          {!loading && rightIcon}
        </span>
      </Comp>
    );
  },
);

Button.displayName = 'Button';

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

export { buttonVariants };
