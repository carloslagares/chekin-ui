import * as React from 'react';
import { cn } from '../lib/cn';

export interface RatingStarsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 0–5, supports half-star increments (e.g. 4.5). */
  value: number;
  max?: number;
  /** Pixel size of each star. Default 16. */
  size?: number;
  /** Optional short label shown to the right (e.g. "125 reviews"). */
  label?: React.ReactNode;
  /** If provided, the component becomes interactive. */
  onChange?: (nextValue: number) => void;
  /** Read-only — even if onChange is set, block interaction. */
  readOnly?: boolean;
}

/**
 * Five-star rating. Filled stars use Main Blue (on-brand, not the typical yellow).
 * Empty stars use Gray-3. Half-star support via a half-width clipped overlay.
 */
export const RatingStars = React.forwardRef<HTMLDivElement, RatingStarsProps>(
  (
    {
      className,
      value,
      max = 5,
      size = 16,
      label,
      onChange,
      readOnly,
      ...props
    },
    ref,
  ) => {
    const interactive = typeof onChange === 'function' && !readOnly;
    const clamped = Math.min(Math.max(value, 0), max);

    return (
      <div
        ref={ref}
        role={interactive ? 'radiogroup' : 'img'}
        aria-label={`${clamped} out of ${max} stars`}
        className={cn('inline-flex items-center gap-chekin-1', className)}
        {...props}
      >
        <div className="inline-flex items-center gap-[4px]">
          {Array.from({ length: max }, (_, i) => {
            const position = i + 1;
            const fill = Math.min(Math.max(clamped - i, 0), 1);
            return (
              <StarSlot
                key={i}
                position={position}
                fill={fill}
                size={size}
                interactive={interactive}
                onSelect={interactive ? () => onChange?.(position) : undefined}
              />
            );
          })}
        </div>
        {label && (
          <span className="font-sans font-medium text-[14px] leading-5 text-chekin-gray-1">
            {label}
          </span>
        )}
      </div>
    );
  },
);
RatingStars.displayName = 'RatingStars';

interface StarSlotProps {
  position: number;
  fill: number;
  size: number;
  interactive: boolean;
  onSelect?: () => void;
}

function StarSlot({ position, fill, size, interactive, onSelect }: StarSlotProps) {
  const Container = interactive ? 'button' : 'span';
  return (
    <Container
      type={interactive ? 'button' : undefined}
      onClick={onSelect}
      aria-label={interactive ? `Rate ${position}` : undefined}
      className={cn(
        'relative inline-flex',
        interactive &&
          'outline-none cursor-pointer focus-visible:shadow-chekin-focus rounded-[2px]',
      )}
      style={{ width: size, height: size }}
    >
      <Star size={size} className="text-chekin-gray-3" />
      {fill > 0 && (
        <span
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${fill * 100}%` }}
          aria-hidden="true"
        >
          <Star size={size} className="text-chekin-blue" />
        </span>
      )}
    </Container>
  );
}

function Star({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5 L14.9 8.4 L21.5 9.3 L16.7 13.9 L17.9 20.5 L12 17.4 L6.1 20.5 L7.3 13.9 L2.5 9.3 L9.1 8.4 Z" />
    </svg>
  );
}
