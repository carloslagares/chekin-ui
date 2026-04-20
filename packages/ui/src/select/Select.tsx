import * as React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '../lib/cn';

export const SelectRoot = RadixSelect.Root;
export const SelectValue = RadixSelect.Value;
export const SelectGroup = RadixSelect.Group;
export const SelectPortal = RadixSelect.Portal;

export const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Trigger>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-between gap-chekin-1',
      'h-10 px-[14px] w-full',
      'rounded-chekin-standard bg-chekin-surface-input-empty',
      'border border-[rgba(22,22,67,0.2)]',
      'font-sans font-medium text-[14px] leading-5 text-chekin-navy',
      'placeholder:text-chekin-gray-1',
      'outline-none transition-colors',
      'focus:border-chekin-navy focus:shadow-chekin-focus',
      'data-[state=open]:border-chekin-navy',
      'data-[placeholder]:text-chekin-gray-1',
      'disabled:opacity-30 disabled:pointer-events-none',
      className,
    )}
    {...props}
  >
    {children}
    <RadixSelect.Icon asChild>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-chekin-gray-1"
        aria-hidden="true"
      >
        <path d="M3 5.5 L7 9.5 L11 5.5" />
      </svg>
    </RadixSelect.Icon>
  </RadixSelect.Trigger>
));
SelectTrigger.displayName = 'SelectTrigger';

export const SelectContent = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Content>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <RadixSelect.Portal>
    <RadixSelect.Content
      ref={ref}
      position={position}
      sideOffset={6}
      className={cn(
        'z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden',
        'rounded-chekin-standard bg-white border border-chekin-gray-3',
        'shadow-chekin-dropdown',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        className,
      )}
      {...props}
    >
      <RadixSelect.Viewport className="p-[4px]">{children}</RadixSelect.Viewport>
    </RadixSelect.Content>
  </RadixSelect.Portal>
));
SelectContent.displayName = 'SelectContent';

export const SelectItem = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Item>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Item>
>(({ className, children, ...props }, ref) => (
  <RadixSelect.Item
    ref={ref}
    className={cn(
      'relative flex items-center gap-chekin-1',
      'h-8 pl-[28px] pr-[10px] rounded-chekin-input cursor-pointer select-none',
      'font-sans font-medium text-[14px] leading-5 text-chekin-navy',
      'outline-none',
      'data-[highlighted]:bg-chekin-surface-pressed data-[highlighted]:text-chekin-blue',
      'data-[state=checked]:text-chekin-blue',
      'data-[disabled]:opacity-30 data-[disabled]:pointer-events-none',
      className,
    )}
    {...props}
  >
    <span className="absolute left-[8px] inline-flex items-center justify-center w-[14px] h-[14px]">
      <RadixSelect.ItemIndicator>
        <svg
          viewBox="0 0 10 8"
          className="w-[10px] h-[8px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M1 4.5 L3.8 7 L9 1" />
        </svg>
      </RadixSelect.ItemIndicator>
    </span>
    <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
  </RadixSelect.Item>
));
SelectItem.displayName = 'SelectItem';

export const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Separator>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Separator>
>(({ className, ...props }, ref) => (
  <RadixSelect.Separator
    ref={ref}
    className={cn('mx-[6px] my-[4px] h-px bg-chekin-gray-3', className)}
    {...props}
  />
));
SelectSeparator.displayName = 'SelectSeparator';

export const SelectLabel = React.forwardRef<
  React.ElementRef<typeof RadixSelect.Label>,
  React.ComponentPropsWithoutRef<typeof RadixSelect.Label>
>(({ className, ...props }, ref) => (
  <RadixSelect.Label
    ref={ref}
    className={cn(
      'px-[10px] py-[6px] font-sans text-[12px] leading-4 text-chekin-gray-2 uppercase tracking-wide',
      className,
    )}
    {...props}
  />
));
SelectLabel.displayName = 'SelectLabel';

export interface SelectProps
  extends React.ComponentPropsWithoutRef<typeof RadixSelect.Root> {
  placeholder?: string;
  label?: string;
  supportingText?: string;
  errorText?: string;
  containerClassName?: string;
  triggerClassName?: string;
  children: React.ReactNode;
}

/**
 * Convenience wrapper that renders a full labelled Select with trigger + content.
 * For advanced compositions, use the exported primitives directly.
 */
export const Select = ({
  placeholder,
  label,
  supportingText,
  errorText,
  containerClassName,
  triggerClassName,
  children,
  ...props
}: SelectProps) => {
  const reactId = React.useId();
  const triggerId = props.name ?? reactId;

  return (
    <div className={cn('flex flex-col gap-chekin-1 w-[300px]', containerClassName)}>
      {label && (
        <label
          htmlFor={triggerId}
          className="text-chekin-navy font-sans font-medium text-[14px] leading-5"
        >
          {label}
        </label>
      )}
      <SelectRoot {...props}>
        <SelectTrigger id={triggerId} className={triggerClassName}>
          <RadixSelect.Value placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </SelectRoot>
      <div className="flex justify-between min-h-[15px]">
        {supportingText && !errorText && (
          <span className="text-chekin-gray-2 font-sans italic text-[12px] leading-[15px]">
            {supportingText}
          </span>
        )}
        {errorText && (
          <span className="ml-auto text-chekin-red font-sans font-medium text-[12px] leading-4 text-right">
            {errorText}
          </span>
        )}
      </div>
    </div>
  );
};
