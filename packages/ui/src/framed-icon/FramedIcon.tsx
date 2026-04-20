import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const framedIconVariants = cva(
  'inline-flex items-center justify-center shrink-0',
  {
    variants: {
      size: {
        s: 'w-8 h-8',
        m: 'w-10 h-10',
        l: 'w-12 h-12',
      },
      shape: {
        rounded: 'rounded-chekin-input',
        circle: 'rounded-full',
      },
      tone: {
        neutral: 'bg-chekin-surface-input-empty text-chekin-gray-1',
        info: 'bg-chekin-surface-pressed text-chekin-blue',
        success: 'bg-[#E8FCF7] text-[#0F9F80]',
        warn: 'bg-[#FFF4E5] text-[#B86A00]',
        error: 'bg-[#FFE8EF] text-chekin-red',
      },
    },
    defaultVariants: { size: 'm', shape: 'rounded', tone: 'info' },
  },
);

export interface FramedIconProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'>,
    VariantProps<typeof framedIconVariants> {
  children: React.ReactNode;
}

export const FramedIcon = React.forwardRef<HTMLSpanElement, FramedIconProps>(
  ({ className, size, shape, tone, children, ...props }, ref) => (
    <span
      ref={ref}
      aria-hidden="true"
      className={cn(framedIconVariants({ size, shape, tone }), className)}
      {...props}
    >
      {children}
    </span>
  ),
);
FramedIcon.displayName = 'FramedIcon';
