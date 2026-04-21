import * as React from 'react';
import { cn } from '../lib/cn';
import { Sparkline, type SparklineVariant } from '../sparkline';

export type KpiTileTone = 'positive' | 'negative' | 'muted' | 'neutral';

export interface KpiTileProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Top-left label (e.g. "Bookings imported"). */
  label: React.ReactNode;
  /** Optional small help icon (typically a tooltip target) next to the label. */
  helpIcon?: React.ReactNode;
  /** Hero number (or React node). */
  value: React.ReactNode;
  /** Below-value caption — pair an arrow chip via `deltaIcon` if you want one. */
  delta?: React.ReactNode;
  /** Optional leading chip for `delta`. Pass `'up' | 'flat'` for the canned versions. */
  deltaIcon?: 'up' | 'flat' | 'down' | React.ReactNode;
  /** Tints the delta text. `muted` also greys the value (used for fresh-account empty states). */
  deltaTone?: KpiTileTone;
  /** Optional sparkline at the bottom. Pass a variant string or a custom node (e.g. `<LineChart />`). */
  spark?: SparklineVariant | React.ReactNode;
}

const TONE_CLASS: Record<KpiTileTone, string> = {
  positive: 'text-[#0F9F80]',
  negative: 'text-chekin-red',
  muted: 'text-chekin-gray-2',
  neutral: 'text-chekin-gray-1',
};

const DELTA_CHIP_BG: Record<'up' | 'flat' | 'down', string> = {
  up: 'bg-[#E8FCF7]',
  flat: 'bg-[#E8FCF7]',
  down: 'bg-[#FFE8EF]',
};
const DELTA_CHIP_FG: Record<'up' | 'flat' | 'down', string> = {
  up: 'text-[#0F9F80]',
  flat: 'text-[#0F9F80]',
  down: 'text-chekin-red',
};

function renderDeltaIcon(icon: KpiTileProps['deltaIcon']): React.ReactNode {
  if (icon === 'up' || icon === 'flat' || icon === 'down') {
    return <DeltaChip kind={icon as 'up' | 'flat' | 'down'} />;
  }
  return icon ?? null;
}

function DeltaChip({ kind }: { kind: 'up' | 'flat' | 'down' }) {
  return (
    <span
      className={cn(
        'inline-grid place-items-center w-4 h-4 rounded-full',
        DELTA_CHIP_BG[kind],
        DELTA_CHIP_FG[kind],
      )}
      aria-hidden="true"
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {kind === 'up' && <path d="M5 12h14M13 5l7 7-7 7" transform="rotate(-45 12 12)" />}
        {kind === 'down' && <path d="M5 12h14M13 5l7 7-7 7" transform="rotate(45 12 12)" />}
        {kind === 'flat' && <path d="M5 12h14M13 5l7 7-7 7" />}
      </svg>
    </span>
  );
}

/**
 * Stacked KPI tile (label on top → value → delta line → optional sparkline).
 * Distinct from `StatCard`, which leads with an icon chip and a percentage
 * trend pill. Use `KpiTile` for dashboards where you want the value to lead
 * and a contextual one-liner instead of a strict trend %.
 */
export const KpiTile = React.forwardRef<HTMLDivElement, KpiTileProps>(
  ({ className, label, helpIcon, value, delta, deltaIcon, deltaTone = 'neutral', spark, ...props }, ref) => {
    const muted = deltaTone === 'muted';
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-chekin-1',
          'bg-white rounded-chekin-card',
          'border border-chekin-gray-3 shadow-chekin-card',
          'p-chekin-3',
          className,
        )}
        {...props}
      >
        <div className="font-sans font-medium text-[13px] leading-4 text-chekin-gray-1 flex items-center gap-[6px]">
          <span className="truncate">{label}</span>
          {helpIcon && <span className="inline-flex shrink-0 text-chekin-gray-2">{helpIcon}</span>}
        </div>
        <div
          className={cn(
            'font-sans font-bold text-[30px] leading-9 tracking-[-0.01em] tabular-nums',
            muted ? 'text-chekin-gray-2' : 'text-chekin-navy',
          )}
        >
          {value}
        </div>
        {(delta || deltaIcon) && (
          <div className={cn('font-sans font-medium text-[12px] leading-4 flex items-center gap-[6px]', TONE_CLASS[deltaTone])}>
            {renderDeltaIcon(deltaIcon)}
            <span className="truncate">{delta}</span>
          </div>
        )}
        {spark != null && (
          <div className="h-7 mt-[2px]">
            {typeof spark === 'string'
              ? <Sparkline variant={spark as SparklineVariant} />
              : spark}
          </div>
        )}
      </div>
    );
  },
);
KpiTile.displayName = 'KpiTile';
