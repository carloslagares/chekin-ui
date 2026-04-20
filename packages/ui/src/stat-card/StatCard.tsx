import * as React from 'react';
import { cn } from '../lib/cn';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  /**
   * Signed percentage. Positive → up arrow in green; negative → down arrow in red.
   * Pass `trendLabel` to override the auto-formatted text.
   */
  trend?: number;
  trendLabel?: string;
  /** Small help icon to the right of the label (typically a tooltip target). */
  helpIcon?: React.ReactNode;
  /**
   * Leading icon, shown inside a pale-blue circular chip. Pass a stroke-based
   * SVG (Lucide-style, ~20×20, 1.5–2px stroke) — it inherits Main Blue color
   * via `currentColor`.
   */
  icon?: React.ReactNode;
  /** Optional short comparison caption under the value (e.g. "vs. last month"). */
  caption?: React.ReactNode;
}

/**
 * Dashboard KPI tile. Structure:
 *   [icon chip] | label (+ help) | value | trend + caption
 *
 * Colour discipline: one pale-blue chip colour for all cards (Chekin Pressed Blue),
 * Main Blue icon, navy value, gray label. Green/red reserved for trend semantics.
 */
export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, label, value, trend, trendLabel, helpIcon, icon, caption, ...props }, ref) => {
    const trendUp = typeof trend === 'number' && trend > 0;
    const trendDown = typeof trend === 'number' && trend < 0;
    const formattedTrend =
      trendLabel ??
      (typeof trend === 'number'
        ? `${trend > 0 ? '+' : ''}${trend.toFixed(1)}%`
        : null);

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex flex-col gap-chekin-2 p-chekin-3',
          'bg-white rounded-chekin-standard',
          'border border-chekin-gray-3 shadow-chekin-card',
          className,
        )}
        {...props}
      >
        <div className="flex items-start gap-chekin-2">
          {icon && (
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-chekin-surface-pressed text-chekin-blue"
            >
              {icon}
            </span>
          )}
          <div className="flex flex-col gap-[2px] min-w-0 flex-1">
            <div className="inline-flex items-center gap-[4px] text-chekin-gray-1">
              <span className="font-sans font-medium text-[13px] leading-4 truncate">{label}</span>
              {helpIcon && <span className="inline-flex shrink-0">{helpIcon}</span>}
            </div>
            <span className="font-sans font-semibold text-[24px] leading-8 text-chekin-navy tabular-nums">
              {value}
            </span>
          </div>
        </div>

        {(formattedTrend || caption) && (
          <div className="flex items-center gap-chekin-1">
            {formattedTrend && (
              <span
                className={cn(
                  'inline-flex items-center gap-[4px] font-sans font-semibold text-[12px] leading-4 px-[8px] py-[2px] rounded-full',
                  trendUp && 'text-[#0F9F80] bg-[#E8FCF7]',
                  trendDown && 'text-chekin-red bg-[#FFE8EF]',
                  !trendUp && !trendDown && 'text-chekin-gray-1 bg-chekin-surface-input-empty',
                )}
              >
                {trendUp && <TrendUpIcon />}
                {trendDown && <TrendDownIcon />}
                {formattedTrend}
              </span>
            )}
            {caption && (
              <span className="font-sans text-[12px] leading-4 text-chekin-gray-2">
                {caption}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);
StatCard.displayName = 'StatCard';

function TrendUpIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M5 1.5 L9 8 L1 8 Z" fill="currentColor" />
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M5 8.5 L1 2 L9 2 Z" fill="currentColor" />
    </svg>
  );
}
