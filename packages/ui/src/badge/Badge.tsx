import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-[4px] font-sans font-semibold rounded-full whitespace-nowrap',
  {
    variants: {
      tone: {
        neutral: '',
        info: '',
        success: '',
        warn: '',
        error: '',
      },
      appearance: {
        soft: '',
        solid: '',
        outline: 'bg-white',
      },
      size: {
        s: 'h-5 px-[8px] text-[11px]',
        m: 'h-6 px-[10px] text-[12px]',
      },
    },
    compoundVariants: [
      // soft
      { tone: 'neutral', appearance: 'soft', class: 'bg-chekin-surface-input-empty text-chekin-navy' },
      { tone: 'info', appearance: 'soft', class: 'bg-chekin-surface-pressed text-chekin-blue' },
      { tone: 'success', appearance: 'soft', class: 'bg-[#E8FCF7] text-[#0F9F80]' },
      { tone: 'warn', appearance: 'soft', class: 'bg-[#FFF4E5] text-[#B86A00]' },
      { tone: 'error', appearance: 'soft', class: 'bg-[#FFE8EF] text-chekin-red' },
      // solid
      { tone: 'neutral', appearance: 'solid', class: 'bg-chekin-navy text-white' },
      { tone: 'info', appearance: 'solid', class: 'bg-chekin-blue text-white' },
      { tone: 'success', appearance: 'solid', class: 'bg-[#0F9F80] text-white' },
      { tone: 'warn', appearance: 'solid', class: 'bg-[#B86A00] text-white' },
      { tone: 'error', appearance: 'solid', class: 'bg-chekin-red text-white' },
      // outline
      { tone: 'neutral', appearance: 'outline', class: 'border border-chekin-gray-3 text-chekin-navy' },
      { tone: 'info', appearance: 'outline', class: 'border border-chekin-blue text-chekin-blue' },
      { tone: 'success', appearance: 'outline', class: 'border border-[#0F9F80] text-[#0F9F80]' },
      { tone: 'warn', appearance: 'outline', class: 'border border-[#B86A00] text-[#B86A00]' },
      { tone: 'error', appearance: 'outline', class: 'border border-chekin-red text-chekin-red' },
    ],
    defaultVariants: { tone: 'neutral', appearance: 'soft', size: 'm' },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, appearance, size, dot, children, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ tone, appearance, size }), className)} {...props}>
      {dot && <span className="w-[6px] h-[6px] rounded-full bg-current" aria-hidden="true" />}
      {children}
    </span>
  ),
);
Badge.displayName = 'Badge';
