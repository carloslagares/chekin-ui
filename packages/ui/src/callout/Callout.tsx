import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const calloutVariants = cva(
  'relative flex items-start gap-chekin-2 p-chekin-3 rounded-chekin-standard',
  {
    variants: {
      tone: {
        info: 'bg-[#EFF6FF] border-l-[4px] border-chekin-blue',
        tip: 'bg-[#E8FCF7] border-l-[4px] border-[#0F9F80]',
        warn: 'bg-[#FFF4E5] border-l-[4px] border-[#B86A00]',
        error: 'bg-[#FFE8EF] border-l-[4px] border-chekin-red',
        note: 'bg-chekin-surface-card border-l-[4px] border-[#5F5CF0]',
      },
    },
    defaultVariants: { tone: 'info' },
  },
);

export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'>,
    VariantProps<typeof calloutVariants> {
  title?: React.ReactNode;
  icon?: React.ReactNode;
}

export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, tone, title, icon, children, ...props }, ref) => (
    <div ref={ref} role="note" className={cn(calloutVariants({ tone }), className)} {...props}>
      {icon && <span className="shrink-0 pt-[2px]">{icon}</span>}
      <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
        {title && (
          <span className="font-sans font-semibold text-[13px] leading-5 text-chekin-navy">
            {title}
          </span>
        )}
        <span className="font-sans text-[13px] leading-5 text-chekin-navy">{children}</span>
      </div>
    </div>
  ),
);
Callout.displayName = 'Callout';
