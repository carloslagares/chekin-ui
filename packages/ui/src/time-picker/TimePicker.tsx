import * as React from 'react';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '../select/Select';
import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '../lib/cn';

export interface TimePickerProps {
  value?: string;
  onChange?: (value: string) => void;
  /** Step between time options in minutes. Default 30. */
  step?: number;
  /** 24-hour format. Default true (Chekin is Europe-first). */
  use24h?: boolean;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
}

function buildTimes(step: number, use24h: boolean): string[] {
  const times: string[] = [];
  for (let m = 0; m < 24 * 60; m += step) {
    const h = Math.floor(m / 60);
    const mm = m % 60;
    if (use24h) {
      times.push(`${String(h).padStart(2, '0')}:${String(mm).padStart(2, '0')}`);
    } else {
      const suffix = h < 12 ? 'AM' : 'PM';
      const h12 = ((h + 11) % 12) + 1;
      times.push(`${h12}:${String(mm).padStart(2, '0')} ${suffix}`);
    }
  }
  return times;
}

export const TimePicker = ({
  value,
  onChange,
  step = 30,
  use24h = true,
  placeholder = '--:--',
  label,
  disabled,
  className,
}: TimePickerProps) => {
  const times = React.useMemo(() => buildTimes(step, use24h), [step, use24h]);
  const id = React.useId();

  return (
    <div className={cn('flex flex-col gap-chekin-1 w-[160px]', className)}>
      {label && (
        <label htmlFor={id} className="text-chekin-navy font-sans font-medium text-[14px] leading-5">
          {label}
        </label>
      )}
      <SelectRoot value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger id={id}>
          <RadixSelect.Value placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="max-h-[260px]">
          {times.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
};
