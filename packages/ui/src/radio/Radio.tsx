import * as React from 'react';
import * as RadixRadio from '@radix-ui/react-radio-group';
import { cn } from '../lib/cn';

export const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadixRadio.Root>,
  React.ComponentPropsWithoutRef<typeof RadixRadio.Root>
>(({ className, ...props }, ref) => (
  <RadixRadio.Root
    ref={ref}
    className={cn('flex flex-col gap-chekin-1', className)}
    {...props}
  />
));
RadioGroup.displayName = 'RadioGroup';

export interface RadioProps
  extends React.ComponentPropsWithoutRef<typeof RadixRadio.Item> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Radio = React.forwardRef<
  React.ElementRef<typeof RadixRadio.Item>,
  RadioProps
>(({ className, label, description, id, ...props }, ref) => {
  const reactId = React.useId();
  const inputId = id ?? reactId;

  const dot = (
    <RadixRadio.Item
      ref={ref}
      id={inputId}
      className={cn(
        'inline-grid place-items-center align-middle',
        'w-[18px] h-[18px] rounded-full bg-white border-[1.5px] border-chekin-gray-separator',
        'outline-none transition-colors',
        'focus-visible:shadow-chekin-focus',
        'data-[state=checked]:border-chekin-blue',
        'disabled:opacity-30 disabled:pointer-events-none',
        className,
      )}
      {...props}
    >
      <RadixRadio.Indicator className="block w-[8px] h-[8px] rounded-full bg-chekin-blue" />
    </RadixRadio.Item>
  );

  if (!label && !description) return dot;

  return (
    <label
      htmlFor={inputId}
      className="inline-flex items-start gap-chekin-1 cursor-pointer select-none"
    >
      {dot}
      <span className="flex flex-col gap-[2px]">
        {label && (
          <span className="font-sans font-medium text-[14px] leading-5 text-chekin-navy">
            {label}
          </span>
        )}
        {description && (
          <span className="font-sans text-[12px] leading-4 text-chekin-gray-1">
            {description}
          </span>
        )}
      </span>
    </label>
  );
});
Radio.displayName = 'Radio';
