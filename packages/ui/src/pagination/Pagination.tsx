import * as React from 'react';
import { cn } from '../lib/cn';

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  /** Number of sibling pages shown around the current. Default 1. */
  siblingCount?: number;
  /** Show first/last buttons. Default true. */
  showEdges?: boolean;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

function getPages(current: number, total: number, siblings: number): (number | 'gap')[] {
  const boundary = 1;
  const totalNumbers = siblings * 2 + 3 + boundary * 2;
  if (total <= totalNumbers) return range(1, total);
  const leftGap = current - siblings > 2 + boundary;
  const rightGap = current + siblings < total - 1 - boundary;
  const firstPages = [1];
  const lastPages = [total];
  if (!leftGap && rightGap) {
    return [...range(1, 3 + siblings * 2), 'gap', ...lastPages];
  }
  if (leftGap && !rightGap) {
    return [...firstPages, 'gap', ...range(total - 2 - siblings * 2, total)];
  }
  return [
    ...firstPages,
    'gap',
    ...range(current - siblings, current + siblings),
    'gap',
    ...lastPages,
  ];
}

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ className, page, pageCount, onChange, siblingCount = 1, showEdges = true, ...props }, ref) => {
    const pages = getPages(page, pageCount, siblingCount);

    return (
      <nav ref={ref} aria-label="Pagination" className={cn('inline-flex items-center gap-[4px]', className)} {...props}>
        {showEdges && (
          <PageButton
            label="First page"
            onClick={() => onChange(1)}
            disabled={page === 1}
          >
            <Chevrons direction="left" />
          </PageButton>
        )}
        <PageButton label="Previous" onClick={() => onChange(page - 1)} disabled={page === 1}>
          <Chevron direction="left" />
        </PageButton>
        {pages.map((p, i) =>
          p === 'gap' ? (
            <span key={`gap-${i}`} className="w-8 text-center text-chekin-gray-2 font-sans text-[13px]">
              …
            </span>
          ) : (
            <PageButton
              key={p}
              label={`Page ${p}`}
              onClick={() => onChange(p)}
              active={p === page}
            >
              {p}
            </PageButton>
          ),
        )}
        <PageButton label="Next" onClick={() => onChange(page + 1)} disabled={page === pageCount}>
          <Chevron direction="right" />
        </PageButton>
        {showEdges && (
          <PageButton label="Last page" onClick={() => onChange(pageCount)} disabled={page === pageCount}>
            <Chevrons direction="right" />
          </PageButton>
        )}
      </nav>
    );
  },
);
Pagination.displayName = 'Pagination';

interface PageButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  label: string;
}

function PageButton({ active, label, className, children, ...props }: PageButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'inline-flex items-center justify-center min-w-8 h-8 px-[8px]',
        'rounded-chekin-input font-sans font-semibold text-[13px] leading-4',
        'outline-none transition-colors',
        'focus-visible:shadow-chekin-focus disabled:opacity-30 disabled:pointer-events-none',
        active
          ? 'bg-chekin-blue text-white border border-chekin-blue'
          : 'bg-white text-chekin-navy border border-chekin-gray-3 hover:bg-chekin-surface-input-empty',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  const d = direction === 'left' ? 'M8 3 L4 7 L8 11' : 'M4 3 L8 7 L4 11';
  return (
    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function Chevrons({ direction }: { direction: 'left' | 'right' }) {
  const d1 = direction === 'left' ? 'M9 3 L5 7 L9 11' : 'M5 3 L9 7 L5 11';
  const d2 = direction === 'left' ? 'M5 3 L1 7 L5 11' : 'M1 3 L5 7 L1 11';
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d1} /><path d={d2} />
    </svg>
  );
}
