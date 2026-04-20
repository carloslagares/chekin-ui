import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const cardVariants = cva('bg-white', {
  variants: {
    padding: {
      none: 'p-0',
      s: 'p-chekin-2',
      m: 'p-chekin-3',
      l: 'p-chekin-4',
    },
    appearance: {
      outlined: 'border border-chekin-gray-3 rounded-chekin-standard',
      elevated: 'border border-chekin-gray-3 rounded-chekin-standard shadow-chekin-card',
      flat: 'rounded-chekin-standard',
    },
  },
  defaultVariants: { padding: 'm', appearance: 'elevated' },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding, appearance, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ padding, appearance }), className)} {...props} />
  ),
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-start justify-between gap-chekin-2 mb-chekin-2', className)} {...props} />
  ),
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-sans font-semibold text-[16px] leading-5 text-chekin-navy', className)} {...props} />
  ),
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('font-sans text-[13px] leading-4 text-chekin-gray-1 mt-[2px]', className)} {...props} />
  ),
);
CardDescription.displayName = 'CardDescription';

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-end gap-chekin-1 mt-chekin-2 pt-chekin-2 border-t border-chekin-gray-3', className)} {...props} />
  ),
);
CardFooter.displayName = 'CardFooter';
