import * as React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover';
import { Calendar } from '../calendar/Calendar';
import { cn } from '../lib/cn';

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  label?: string;
  supportingText?: string;
  errorText?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  containerClassName?: string;
  triggerClassName?: string;
  formatDate?: (date: Date) => string;
  locale?: Intl.Locale | undefined;
}

const defaultFormat = (d: Date) =>
  d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

export const DatePicker = ({
  value,
  onChange,
  placeholder = 'Select a date',
  label,
  supportingText,
  errorText,
  disabled,
  minDate,
  maxDate,
  containerClassName,
  triggerClassName,
  formatDate = defaultFormat,
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const triggerId = React.useId();
  const hasValue = Boolean(value);
  const hasError = Boolean(errorText);

  return (
    <div className={cn('flex flex-col gap-chekin-1 w-[300px]', containerClassName)}>
      {label && (
        <label htmlFor={triggerId} className="text-chekin-navy font-sans font-medium text-[14px] leading-5">
          {label}
        </label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={triggerId}
            type="button"
            disabled={disabled}
            aria-invalid={hasError || undefined}
            className={cn(
              'inline-flex items-center justify-between gap-chekin-1 h-10 px-[14px]',
              'rounded-chekin-standard border font-sans font-medium text-[14px] leading-5 outline-none transition-colors',
              'focus:shadow-chekin-focus disabled:opacity-30 disabled:pointer-events-none',
              hasError
                ? 'bg-white border-chekin-red text-chekin-navy'
                : hasValue
                  ? 'bg-white border-chekin-navy text-chekin-navy'
                  : 'bg-chekin-surface-input-empty border-[rgba(22,22,67,0.2)] text-chekin-gray-1',
              triggerClassName,
            )}
          >
            <span className="inline-flex items-center gap-chekin-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="12" height="11" rx="2" />
                <path d="M10 1.5v3M6 1.5v3M2 7h12" />
              </svg>
              <span>{value ? formatDate(value) : placeholder}</span>
            </span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-chekin-gray-1" aria-hidden="true">
              <path d="M3 5.5 L7 9.5 L11 5.5" />
            </svg>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-chekin-2">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(d) => {
              onChange?.(d);
              if (d) setOpen(false);
            }}
            disabled={
              minDate || maxDate
                ? [
                    ...(minDate ? [{ before: minDate }] : []),
                    ...(maxDate ? [{ after: maxDate }] : []),
                  ]
                : undefined
            }
          />
        </PopoverContent>
      </Popover>
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
