import * as React from 'react';
import { cn } from '../lib/cn';

export type SetupStepState = 'done' | 'active' | 'todo';

export interface SetupStepProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  state?: SetupStepState;
  icon: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Call-to-action label (e.g. "Connect", "Set up", "Completed"). */
  cta?: React.ReactNode;
}

const STEP_RING: Record<SetupStepState, string> = {
  done:   'bg-[#E8FCF7] text-[#0F9F80]',
  active: 'bg-[#EFF6FF] text-chekin-blue shadow-[0_0_0_3px_rgba(56,92,248,0.18)]',
  todo:   'bg-chekin-surface-input-empty text-chekin-gray-1',
};
const STEP_TITLE: Record<SetupStepState, string> = {
  done:   'text-chekin-gray-1',
  active: 'text-chekin-navy',
  todo:   'text-chekin-navy',
};
const STEP_CTA: Record<SetupStepState, string> = {
  done:   'text-[#0F9F80]',
  active: 'text-chekin-blue',
  todo:   'text-chekin-blue',
};

export const SetupStep = React.forwardRef<HTMLButtonElement, SetupStepProps>(
  ({ className, state = 'todo', icon, title, description, cta, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'group text-left flex flex-col gap-chekin-1 px-chekin-2 py-chekin-3',
        'hover:bg-[#FBFBFE] transition-colors',
        'outline-none focus-visible:shadow-chekin-focus rounded-none',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'relative inline-grid place-items-center w-10 h-10 rounded-[10px] shrink-0',
          STEP_RING[state],
        )}
        aria-hidden="true"
      >
        {icon}
        {state === 'done' && (
          <span className="absolute -right-1 -bottom-1 w-[18px] h-[18px] rounded-full bg-[#35E5BC] border-2 border-white grid place-items-center">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </span>
        )}
      </span>
      <span className={cn('font-sans font-semibold text-[14px] leading-5', STEP_TITLE[state])}>{title}</span>
      {description && (
        <span className="font-sans text-[12px] leading-[18px] text-chekin-gray-2 flex-1">
          {description}
        </span>
      )}
      {cta && (
        <span className={cn('mt-auto font-sans font-semibold text-[13px] inline-flex items-center gap-[4px]', STEP_CTA[state])}>
          {cta}
          {state !== 'done' && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          )}
        </span>
      )}
    </button>
  ),
);
SetupStep.displayName = 'SetupStep';

export interface SetupChecklistProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Tag rendered next to the title, e.g. "2 of 5 done". */
  badge?: React.ReactNode;
  /** Progress percentage 0–100. */
  progress: number;
  /** Right-aligned label above the bar, e.g. "about 8 minutes left". */
  estimateLabel?: React.ReactNode;
  /** Pass `<SetupStep />` children. They render as horizontal columns separated by hairline borders. */
  children?: React.ReactNode;
}

export const SetupChecklist = React.forwardRef<HTMLElement, SetupChecklistProps>(
  ({ className, title, description, badge, progress, estimateLabel, children, ...props }, ref) => {
    const steps = React.Children.toArray(children);
    return (
      <section
        ref={ref}
        className={cn(
          'bg-white rounded-chekin-card border border-chekin-gray-3 shadow-chekin-card overflow-hidden',
          className,
        )}
        {...props}
      >
        <div className="flex items-center justify-between gap-chekin-3 px-chekin-3 py-chekin-3 border-b border-chekin-gray-3">
          <div className="flex flex-col gap-[4px] min-w-0">
            <h3 className="font-sans font-semibold text-[18px] leading-6 text-chekin-navy m-0 flex items-center gap-[10px]">
              <span className="truncate">{title}</span>
              {badge}
            </h3>
            {description && (
              <p className="font-sans text-[14px] text-chekin-gray-1 m-0">{description}</p>
            )}
          </div>
          <div className="flex flex-col items-end gap-[6px] shrink-0 min-w-[220px]">
            {estimateLabel && (
              <span className="font-sans font-medium text-[13px] text-chekin-gray-1">{estimateLabel}</span>
            )}
            <div className="w-[220px] h-2 rounded-full bg-chekin-surface-input-empty overflow-hidden">
              <span
                className="block h-full bg-chekin-blue rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
              />
            </div>
          </div>
        </div>
        <div
          className="grid divide-x divide-chekin-gray-3"
          style={{ gridTemplateColumns: `repeat(${Math.max(1, steps.length)}, minmax(0, 1fr))` }}
        >
          {children}
        </div>
      </section>
    );
  },
);
SetupChecklist.displayName = 'SetupChecklist';
