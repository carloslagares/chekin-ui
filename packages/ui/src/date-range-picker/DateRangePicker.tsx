import * as React from 'react';
import type { DateRange } from 'react-day-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../popover/Popover';
import { Calendar } from '../calendar/Calendar';
import { cn } from '../lib/cn';

export interface DateRangePickerProps {
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  label?: string;
  fromPlaceholder?: string;
  toPlaceholder?: string;
  supportingText?: string;
  errorText?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  /** Number of months shown in the popover. Default 2 (Airbnb-style). */
  numberOfMonths?: number;
  containerClassName?: string;
  triggerClassName?: string;
  formatDate?: (date: Date) => string;
}

const defaultFormat = (d: Date) =>
  d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });

export const DateRangePicker = ({
  value,
  onChange,
  label,
  fromPlaceholder = 'Check-in',
  toPlaceholder = 'Check-out',
  supportingText,
  errorText,
  disabled,
  minDate,
  maxDate,
  numberOfMonths = 2,
  containerClassName,
  triggerClassName,
  formatDate = defaultFormat,
}: DateRangePickerProps) => {
  const [open, setOpen] = React.useState(false);
  const triggerId = React.useId();
  const hasFrom = Boolean(value?.from);
  const hasTo = Boolean(value?.to);
  const hasError = Boolean(errorText);

  return (
    <div className={cn('flex flex-col gap-chekin-1 w-[420px]', containerClassName)}>
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
              'inline-flex items-stretch h-10 rounded-chekin-standard border overflow-hidden',
              'outline-none transition-colors focus:shadow-chekin-focus',
              'disabled:opacity-30 disabled:pointer-events-none',
              hasError
                ? 'border-chekin-red bg-white'
                : hasFrom || hasTo
                  ? 'border-chekin-navy bg-white'
                  : 'border-[rgba(22,22,67,0.2)] bg-chekin-surface-input-empty',
              triggerClassName,
            )}
          >
            <span
              className={cn(
                'flex-1 px-[14px] inline-flex items-center justify-start font-sans font-medium text-[14px] leading-5',
                hasFrom ? 'text-chekin-navy' : 'text-chekin-gray-1',
              )}
            >
              {hasFrom ? formatDate(value!.from!) : fromPlaceholder}
            </span>
            <span className="w-px bg-chekin-gray-3 my-[8px]" aria-hidden="true" />
            <span
              className={cn(
                'flex-1 px-[14px] inline-flex items-center justify-between font-sans font-medium text-[14px] leading-5',
                hasTo ? 'text-chekin-navy' : 'text-chekin-gray-1',
              )}
            >
              <span>{hasTo ? formatDate(value!.to!) : toPlaceholder}</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-chekin-gray-1 shrink-0" aria-hidden="true">
                <path d="M3 5.5 L7 9.5 L11 5.5" />
              </svg>
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="p-chekin-2" align="start">
          <Calendar
            mode="range"
            selected={value}
            onSelect={onChange}
            numberOfMonths={numberOfMonths}
            pagedNavigation
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
