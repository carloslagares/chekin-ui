import * as React from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import { cn } from '../lib/cn';

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof RadixSwitch.Root> {
  label?: React.ReactNode;
}

export const Switch = React.forwardRef<
  React.ElementRef<typeof RadixSwitch.Root>,
  SwitchProps
>(({ className, label, id, ...props }, ref) => {
  const reactId = React.useId();
  const inputId = id ?? reactId;

  const toggle = (
    <RadixSwitch.Root
      ref={ref}
      id={inputId}
      className={cn(
        'relative inline-flex items-center align-middle shrink-0',
        'w-[36px] h-[20px] rounded-full',
        'bg-chekin-gray-3 transition-colors',
        'outline-none',
        'focus-visible:shadow-chekin-focus',
        'data-[state=checked]:bg-chekin-blue',
        'disabled:opacity-30 disabled:pointer-events-none',
        className,
      )}
      {...props}
    >
      <RadixSwitch.Thumb
        className={cn(
          'block w-[16px] h-[16px] rounded-full bg-white shadow-chekin-xs-button',
          'translate-x-[2px] transition-transform',
          'data-[state=checked]:translate-x-[18px]',
        )}
      />
    </RadixSwitch.Root>
  );

  if (!label) return toggle;

  return (
    <label
      htmlFor={inputId}
      className="inline-flex items-center gap-chekin-1 cursor-pointer select-none"
    >
      {toggle}
      <span className="font-sans font-medium text-[14px] leading-5 text-chekin-navy">
        {label}
      </span>
    </label>
  );
});
Switch.displayName = 'Switch';
