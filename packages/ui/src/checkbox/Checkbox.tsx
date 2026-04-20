import * as React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { cn } from '../lib/cn';

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

export const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  CheckboxProps
>(({ className, label, description, id, ...props }, ref) => {
  const reactId = React.useId();
  const inputId = id ?? reactId;

  const box = (
    <RadixCheckbox.Root
      ref={ref}
      id={inputId}
      className={cn(
        'inline-grid place-items-center align-middle',
        'w-[18px] h-[18px] rounded-[4px] bg-white border-[1.5px] border-chekin-gray-separator',
        'outline-none transition-colors',
        'focus-visible:shadow-chekin-focus',
        'data-[state=checked]:bg-chekin-blue data-[state=checked]:border-chekin-blue',
        'data-[state=indeterminate]:bg-chekin-blue data-[state=indeterminate]:border-chekin-blue',
        'disabled:opacity-30 disabled:pointer-events-none',
        className,
      )}
      {...props}
    >
      <RadixCheckbox.Indicator>
        {props.checked === 'indeterminate' ? (
          <span className="block w-[10px] h-[2px] bg-white" />
        ) : (
          <svg
            viewBox="0 0 10 8"
            className="w-[10px] h-[8px]"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M1 4.5 L3.8 7 L9 1" />
          </svg>
        )}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );

  if (!label && !description) return box;

  return (
    <label
      htmlFor={inputId}
      className="inline-flex items-start gap-chekin-1 cursor-pointer select-none"
    >
      {box}
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

Checkbox.displayName = 'Checkbox';
