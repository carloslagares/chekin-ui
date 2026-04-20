import * as React from 'react';
import { cn } from '../lib/cn';

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, children, ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn(className)} {...props}>
      <ol className="flex items-center gap-[6px] flex-wrap font-sans text-[13px] leading-5">
        {children}
      </ol>
    </nav>
  ),
);
Breadcrumb.displayName = 'Breadcrumb';

export interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
  href?: string;
  current?: boolean;
}

function ChevronRight() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="text-chekin-gray-2">
      <path d="M4 2.5 L8 6 L4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, BreadcrumbItemProps>(
  ({ className, children, href, current, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-[6px]', className)} {...props}>
      {current || !href ? (
        <span
          aria-current={current ? 'page' : undefined}
          className={cn(
            current ? 'text-chekin-navy font-semibold' : 'text-chekin-gray-1',
          )}
        >
          {children}
        </span>
      ) : (
        <a
          href={href}
          className="text-chekin-gray-1 hover:text-chekin-blue outline-none focus-visible:shadow-chekin-focus rounded-[2px]"
        >
          {children}
        </a>
      )}
      {!current && <ChevronRight />}
    </li>
  ),
);
BreadcrumbItem.displayName = 'BreadcrumbItem';
