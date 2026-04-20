import * as React from 'react';
import { cn } from '../lib/cn';

export interface AIPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Branded agent name shown in the header. Default "Vela". */
  agentName?: string;
  /** Optional eyebrow text above the agent name. */
  eyebrow?: React.ReactNode;
  /** Shown at the bottom: composer input. */
  composer?: React.ReactNode;
  /** Suggestion chips rendered above the composer. */
  suggestions?: React.ReactNode;
  /** Click handler for the close (×) button; omit to hide. */
  onClose?: () => void;
  /** Width of the panel. Default 360px. */
  width?: number;
  children?: React.ReactNode;
}

/**
 * AI assistant side panel (right column of AppShell).
 * Shape and content are deliberately minimal so the consumer composes
 * conversational UI inside `children`. The `composer` slot is a sticky
 * footer — wire it to your chat state.
 */
export const AIPanel = React.forwardRef<HTMLDivElement, AIPanelProps>(
  (
    {
      className,
      agentName = 'Vela',
      eyebrow = 'Daily briefing',
      composer,
      suggestions,
      onClose,
      width = 360,
      children,
      ...props
    },
    ref,
  ) => (
    <aside
      ref={ref}
      aria-label={`${agentName} assistant`}
      className={cn('flex flex-col h-full bg-white', className)}
      style={{ width }}
      {...props}
    >
      <header className="flex items-start gap-chekin-2 px-chekin-3 py-chekin-2 border-b border-chekin-gray-3">
        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-chekin-surface-pressed text-chekin-blue shrink-0">
          <Sparkle />
        </span>
        <div className="flex-1 min-w-0">
          {eyebrow && (
            <p className="font-sans text-[11px] leading-4 tracking-wide uppercase text-chekin-gray-2">{eyebrow}</p>
          )}
          <h2 className="font-sans font-semibold text-[16px] leading-5 text-chekin-navy">
            Ask {agentName}
          </h2>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close assistant"
            className="inline-flex items-center justify-center w-8 h-8 rounded-chekin-input text-chekin-gray-1 hover:bg-chekin-surface-input-empty outline-none focus-visible:shadow-chekin-focus"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
              <path d="M2 2 L12 12 M12 2 L2 12" />
            </svg>
          </button>
        )}
      </header>
      <div className="flex-1 overflow-y-auto px-chekin-3 py-chekin-2 flex flex-col gap-chekin-2">
        {children}
      </div>
      {(suggestions || composer) && (
        <div className="border-t border-chekin-gray-3 p-chekin-2 flex flex-col gap-chekin-1">
          {suggestions && <div className="flex flex-wrap gap-[6px]">{suggestions}</div>}
          {composer}
        </div>
      )}
    </aside>
  ),
);
AIPanel.displayName = 'AIPanel';

function Sparkle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M5.6 18.4 7.7 16.3M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
