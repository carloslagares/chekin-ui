import * as React from 'react';
import { cn } from '../lib/cn';

export interface SelectableCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'title'> {
  selected?: boolean;
  onChange?: (next: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  meta?: React.ReactNode;
  price?: React.ReactNode;
  disabled?: boolean;
  /** Shape of the selection indicator. */
  indicator?: 'radio' | 'check' | 'none';
}

export const SelectableCard = React.forwardRef<HTMLDivElement, SelectableCardProps>(
  (
    {
      className,
      selected = false,
      onChange,
      title,
      description,
      icon,
      meta,
      price,
      disabled,
      indicator = 'radio',
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-pressed={selected}
      aria-disabled={disabled || undefined}
      onClick={() => !disabled && onChange?.(!selected)}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onChange?.(!selected);
        }
      }}
      className={cn(
        'relative flex gap-chekin-2 p-chekin-3',
        'rounded-chekin-standard bg-white border cursor-pointer outline-none transition-colors',
        'focus-visible:shadow-chekin-focus',
        selected
          ? 'border-chekin-blue bg-chekin-surface-pressed'
          : 'border-chekin-gray-3 hover:border-chekin-blue-hover',
        disabled && 'opacity-30 pointer-events-none',
        className,
      )}
      {...props}
    >
      {icon && <div className="shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
        <div className="flex items-baseline justify-between gap-chekin-2">
          <span className="font-sans font-semibold text-[14px] leading-5 text-chekin-navy">
            {title}
          </span>
          {price && (
            <span className="font-sans font-semibold text-[14px] leading-5 text-chekin-navy tabular-nums shrink-0">
              {price}
            </span>
          )}
        </div>
        {description && (
          <span className="font-sans text-[12px] leading-4 text-chekin-gray-1">
            {description}
          </span>
        )}
        {meta && (
          <div className="pt-[4px] font-sans text-[12px] leading-4 text-chekin-gray-2">
            {meta}
          </div>
        )}
      </div>
      {indicator !== 'none' && (
        <div className="shrink-0 pt-[2px]">
          {indicator === 'radio' ? (
            <span
              className={cn(
                'block w-[18px] h-[18px] rounded-full border-[1.5px]',
                selected ? 'border-chekin-blue' : 'border-chekin-gray-separator',
              )}
            >
              {selected && (
                <span className="block w-[8px] h-[8px] m-auto mt-[4px] rounded-full bg-chekin-blue" />
              )}
            </span>
          ) : (
            <span
              className={cn(
                'inline-flex items-center justify-center w-[18px] h-[18px] rounded-[4px] border-[1.5px]',
                selected
                  ? 'bg-chekin-blue border-chekin-blue'
                  : 'bg-white border-chekin-gray-separator',
              )}
            >
              {selected && (
                <svg viewBox="0 0 10 8" className="w-[10px] h-[8px]" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 4.5 L3.8 7 L9 1" />
                </svg>
              )}
            </span>
          )}
        </div>
      )}
    </div>
  ),
);
SelectableCard.displayName = 'SelectableCard';
