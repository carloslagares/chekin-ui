import * as React from 'react';
import { cn } from '../lib/cn';

export interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  showIcon?: boolean;
}

export const ExternalLink = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ className, children, showIcon = true, target = '_blank', rel, ...props }, ref) => (
    <a
      ref={ref}
      target={target}
      rel={rel ?? 'noopener noreferrer'}
      className={cn(
        'inline-flex items-center gap-[4px] font-sans font-semibold text-[14px] leading-5',
        'text-chekin-blue hover:text-chekin-blue-hover',
        'outline-none focus-visible:shadow-chekin-focus rounded-[4px]',
        className,
      )}
      {...props}
    >
      {children}
      {showIcon && (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5.5 2.5 H11.5 V 8.5" />
          <path d="M11.5 2.5 L6 8" />
          <path d="M10 9 V12 H2 V4 H5" />
        </svg>
      )}
    </a>
  ),
);
ExternalLink.displayName = 'ExternalLink';
