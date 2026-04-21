import * as React from 'react';
import { cn } from '../lib/cn';

export type SparklineVariant = 'flat' | 'rise' | 'fall' | 'dashed';

export interface SparklineProps extends Omit<React.SVGAttributes<SVGSVGElement>, 'children'> {
  variant?: SparklineVariant;
  /** Stroke colour. Defaults to Chekin Main Blue. */
  color?: string;
  /** Width × height. Use `100%` for `width` to fill its container. */
  width?: number | string;
  height?: number;
}

/**
 * Tiny inline trend chart for KPI tiles. Four canonical shapes — `flat` (no
 * change baseline with end-cap dot), `rise` (positive slope with area fill),
 * `fall` (negative slope), `dashed` (no-data placeholder).
 *
 * For real data series, compose `LineChart` instead.
 */
export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  (
    {
      variant = 'flat',
      color = '#385BF8',
      width = '100%',
      height = 28,
      className,
      ...props
    },
    ref,
  ) => {
    const gradId = React.useId();
    return (
      <svg
        ref={ref}
        viewBox="0 0 120 28"
        preserveAspectRatio="none"
        width={width}
        height={height}
        className={cn('block', className)}
        aria-hidden="true"
        {...props}
      >
        {variant === 'flat' && (
          <>
            <path d="M0 22 L120 22" stroke="#DEDEEB" strokeWidth="2" fill="none" />
            <circle cx="120" cy="22" r="3" fill={color} />
          </>
        )}
        {variant === 'rise' && (
          <>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={color} />
                <stop offset="1" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 24 L20 24 L60 22 L80 20 L100 14 L120 8"
              stroke={color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M0 24 L20 24 L60 22 L80 20 L100 14 L120 8 L120 28 L0 28 Z"
              fill={`url(#${gradId})`}
              opacity="0.18"
            />
          </>
        )}
        {variant === 'fall' && (
          <>
            <defs>
              <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={color} />
                <stop offset="1" stopColor={color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0 6 L20 8 L60 12 L80 16 L100 20 L120 22"
              stroke={color}
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M0 6 L20 8 L60 12 L80 16 L100 20 L120 22 L120 28 L0 28 Z"
              fill={`url(#${gradId})`}
              opacity="0.18"
            />
          </>
        )}
        {variant === 'dashed' && (
          <line
            x1="0"
            y1="22"
            x2="120"
            y2="22"
            stroke="#E5E6EE"
            strokeWidth="2"
            strokeDasharray="3 4"
          />
        )}
      </svg>
    );
  },
);
Sparkline.displayName = 'Sparkline';
