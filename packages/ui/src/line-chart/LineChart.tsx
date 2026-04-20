import * as React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { cn } from '../lib/cn';

export interface LineChartDataPoint {
  /** X-axis label (e.g. ISO date, month). */
  x: string;
  /** Primary Y value. */
  y: number;
}

export interface LineChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: LineChartDataPoint[];
  /** Height in pixels. Default 300. */
  height?: number;
  /** Custom Y-axis formatter (e.g. currency). */
  valueFormatter?: (value: number) => string;
  /** Show the subtle area fill under the line. Default true. */
  showFill?: boolean;
  /** Axis tick formatter for X. */
  xTickFormatter?: (value: string) => string;
}

/**
 * Single-series area/line chart with Chekin styling defaults.
 * One Main Blue line, 10% opacity fill, dotted gray grid, minimal axes.
 */
export const LineChart = ({
  className,
  data,
  height = 300,
  valueFormatter,
  showFill = true,
  xTickFormatter,
  ...props
}: LineChartProps) => (
  <div
    className={cn('w-full font-sans text-chekin-gray-1', className)}
    style={{ height }}
    {...props}
  >
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 8, right: 16, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="chekin-line-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#385BF8" stopOpacity={0.18} />
            <stop offset="100%" stopColor="#385BF8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid
          stroke="#DEDEEB"
          strokeDasharray="3 3"
          vertical={false}
        />
        <XAxis
          dataKey="x"
          stroke="#9696B9"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={xTickFormatter}
          dy={6}
        />
        <YAxis
          stroke="#9696B9"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={valueFormatter}
          width={48}
        />
        <Tooltip
          cursor={{ stroke: '#385BF8', strokeWidth: 1, strokeDasharray: '3 3' }}
          content={<ChartTooltip valueFormatter={valueFormatter} />}
        />
        <Area
          type="monotone"
          dataKey="y"
          stroke="#385BF8"
          strokeWidth={2}
          fill={showFill ? 'url(#chekin-line-fill)' : 'transparent'}
          activeDot={{
            r: 4,
            stroke: '#FFFFFF',
            strokeWidth: 2,
            fill: '#385BF8',
          }}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ value?: number | string }>;
  label?: string | number;
  valueFormatter?: (value: number) => string;
}

function ChartTooltip({ active, payload, label, valueFormatter }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const raw = payload[0]?.value;
  const numericValue = typeof raw === 'number' ? raw : Number(raw);
  const formatted =
    valueFormatter && !Number.isNaN(numericValue) ? valueFormatter(numericValue) : String(raw);
  return (
    <div className="rounded-chekin-standard bg-white border border-chekin-gray-3 shadow-chekin-dropdown px-chekin-2 py-chekin-1">
      <div className="font-sans text-[12px] leading-4 text-chekin-gray-1">{label}</div>
      <div className="font-sans font-semibold text-[14px] leading-5 text-chekin-navy tabular-nums">
        {formatted}
      </div>
    </div>
  );
}
