import * as React from 'react';
import { cn } from '../lib/cn';

export const Table = React.forwardRef<HTMLTableElement, React.TableHTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="w-full overflow-x-auto rounded-chekin-standard border border-chekin-gray-3 bg-white shadow-chekin-card">
      <table
        ref={ref}
        className={cn('w-full border-collapse font-sans text-[13px] leading-5 text-chekin-navy', className)}
        {...props}
      />
    </div>
  ),
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('bg-chekin-surface-input-empty border-b border-chekin-gray-3', className)} {...props} />
  ),
);
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-b-0', className)} {...props} />
  ),
);
TableBody.displayName = 'TableBody';

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  interactive?: boolean;
}

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, interactive, ...props }, ref) => (
    <tr
      ref={ref}
      aria-selected={selected}
      className={cn(
        'border-b border-chekin-gray-3 transition-colors',
        interactive && 'hover:bg-chekin-surface-input-empty cursor-pointer',
        selected && 'bg-chekin-surface-pressed',
        className,
      )}
      {...props}
    />
  ),
);
TableRow.displayName = 'TableRow';

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean;
  /** Current sort direction for this column; null = inactive. */
  sortDirection?: 'asc' | 'desc' | null;
  onSort?: () => void;
  align?: 'left' | 'center' | 'right';
}

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable, sortDirection = null, onSort, align = 'left', children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'px-chekin-2 py-[10px] font-sans font-semibold text-[11px] leading-4 tracking-wide uppercase text-chekin-gray-1',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className,
      )}
      {...props}
    >
      {sortable ? (
        <button
          type="button"
          onClick={onSort}
          className={cn(
            'inline-flex items-center gap-[4px] uppercase tracking-wide outline-none',
            'hover:text-chekin-navy focus-visible:shadow-chekin-focus rounded-[2px]',
            sortDirection && 'text-chekin-navy',
          )}
        >
          {children}
          <SortIcon direction={sortDirection} />
        </button>
      ) : (
        children
      )}
    </th>
  ),
);
TableHead.displayName = 'TableHead';

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: 'left' | 'center' | 'right';
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, align = 'left', ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'px-chekin-2 py-chekin-2 align-middle',
        align === 'left' && 'text-left',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        className,
      )}
      {...props}
    />
  ),
);
TableCell.displayName = 'TableCell';

function SortIcon({ direction }: { direction: 'asc' | 'desc' | null }) {
  return (
    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true">
      <path d="M5 1 L8 4 L2 4 Z" fill={direction === 'asc' ? 'currentColor' : '#CECEDE'} />
      <path d="M5 11 L2 8 L8 8 Z" fill={direction === 'desc' ? 'currentColor' : '#CECEDE'} />
    </svg>
  );
}
