import * as React from 'react';
import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { cn } from '../lib/cn';
import './calendar.css';

export type CalendarProps = DayPickerProps;

/**
 * Chekin Calendar -- styled react-day-picker v9.
 *
 * - `mode="single"` for date picking
 * - `mode="range"` with `numberOfMonths={2}` for Airbnb-style range selection
 * - Tokens-based colors via calendar.css
 */
export function Calendar({ className, ...props }: CalendarProps) {
  return (
    <DayPicker
      className={cn('chekin-rdp', className)}
      showOutsideDays
      {...(props as DayPickerProps)}
    />
  );
}
