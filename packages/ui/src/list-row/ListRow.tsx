import * as React from 'react';
import { cn } from '../lib/cn';

export type ListRowAppearance = 'row' | 'card';
export type ListRowIconTone = 'info' | 'neutral';
export type ListRowIconSize = 's' | 'm';

export interface ListRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /** Leading icon — wrapped in a tinted chip (size + tone driven by props). */
  icon?: React.ReactNode;
  iconSize?: ListRowIconSize;
  iconTone?: ListRowIconTone;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Inline meta to the right of the description (e.g. duration, timestamp). */
  meta?: React.ReactNode;
  /** Trailing slot. Pass `true` for a default chevron, a node for custom content, or `false` for none. */
  trailing?: React.ReactNode | boolean;
  /**
   * `row` → minimal hover-tint list row (used inside panels). `card` → bordered
   * card-style row, hover swaps border to Main Blue.
   */
  appearance?: ListRowAppearance;
}

const ICON_SIZE: Record<ListRowIconSize, string> = {
  s: 'w-9 h-9 rounded-[10px]',
  m: 'w-10 h-10 rounded-[10px]',
};
const ICON_TONE: Record<ListRowIconTone, string> = {
  info:    'bg-[#EFF6FF] text-chekin-blue',
  neutral: 'bg-chekin-surface-input-empty text-chekin-gray-1',
};

const APPEARANCE: Record<ListRowAppearance, string> = {
  row:  'rounded-chekin-standard hover:bg-chekin-surface-input-empty py-chekin-2 px-chekin-2',
  card: 'rounded-chekin-card border border-chekin-gray-3 hover:border-chekin-blue hover:shadow-chekin-card transition-all py-chekin-3 px-chekin-3',
};

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

/**
 * Generic navigable row primitive. Used for guides, resources, recipes,
 * settings entries, anything that follows the "icon chip + title + desc +
 * (meta) + (chevron)" pattern. Two visual modes:
 *
 * - `row` (default) — flat hover-tint inside a panel.
 * - `card` — bordered hoverable surface, used when each row stands alone.
 */
export const ListRow = React.forwardRef<HTMLButtonElement, ListRowProps>(
  (
    {
      className,
      icon,
      iconSize = 'm',
      iconTone = 'info',
      title,
      description,
      meta,
      trailing = true,
      appearance = 'row',
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const trailingNode = trailing === true ? <ChevronRight /> : trailing === false ? null : trailing;
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          'flex items-center gap-chekin-2 text-left w-full',
          'outline-none focus-visible:shadow-chekin-focus transition-colors',
          'bg-white',
          APPEARANCE[appearance],
          className,
        )}
        {...props}
      >
        {icon && (
          <span
            aria-hidden="true"
            className={cn('inline-grid place-items-center shrink-0', ICON_SIZE[iconSize], ICON_TONE[iconTone])}
          >
            {icon}
          </span>
        )}
        <span className="flex-1 min-w-0">
          <span className="block font-sans font-semibold text-[14px] leading-5 text-chekin-navy truncate">{title}</span>
          {description && (
            <span className="block font-sans text-[13px] leading-[18px] text-chekin-gray-1">{description}</span>
          )}
        </span>
        {meta && (
          <span className="font-sans font-medium text-[12px] text-chekin-gray-2 inline-flex items-center gap-[4px] shrink-0">
            {meta}
          </span>
        )}
        {trailingNode && (
          <span className="text-chekin-gray-2 shrink-0">{trailingNode}</span>
        )}
      </button>
    );
  },
);
ListRow.displayName = 'ListRow';
