import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const textareaVariants = cva(
  [
    'w-full font-sans font-medium text-[14px] leading-6',
    'px-[14px] py-[10px] min-h-[80px]',
    'rounded-chekin-standard',
    'border',
    'outline-none transition-colors resize-y',
    'placeholder:text-chekin-gray-1',
    'focus:shadow-chekin-focus',
    'disabled:opacity-30 disabled:pointer-events-none',
  ],
  {
    variants: {
      state: {
        empty: [
          'bg-chekin-surface-input-empty text-chekin-navy',
          'border-[rgba(22,22,67,0.2)]',
          'focus:border-chekin-navy',
        ],
        filled: ['bg-white text-chekin-navy', 'border-chekin-navy'],
        error: [
          'bg-white text-chekin-navy',
          'border-chekin-red',
          'focus:border-chekin-red focus:shadow-[0px_0px_0px_3px_rgba(255,36,103,0.2)]',
        ],
      },
    },
    defaultVariants: { state: 'empty' },
  },
);

type FieldState = NonNullable<VariantProps<typeof textareaVariants>['state']>;

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  supportingText?: string;
  errorText?: string;
  state?: FieldState;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      label,
      supportingText,
      errorText,
      state,
      className,
      containerClassName,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const reactId = React.useId();
    const inputId = id ?? reactId;

    const hasValue =
      (value !== undefined && value !== '') ||
      (defaultValue !== undefined && defaultValue !== '');
    const resolvedState: FieldState =
      state ?? (errorText ? 'error' : hasValue ? 'filled' : 'empty');

    return (
      <div className={cn('flex flex-col gap-chekin-1 w-[300px]', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-chekin-navy font-sans font-medium text-[14px] leading-5"
          >
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={resolvedState === 'error' || undefined}
          aria-describedby={
            errorText
              ? `${inputId}-error`
              : supportingText
                ? `${inputId}-help`
                : undefined
          }
          className={cn(textareaVariants({ state: resolvedState }), className)}
          {...props}
        />
        <div className="flex justify-between min-h-[15px]">
          {supportingText && !errorText && (
            <span
              id={`${inputId}-help`}
              className="text-chekin-gray-2 font-sans italic text-[12px] leading-[15px]"
            >
              {supportingText}
            </span>
          )}
          {errorText && (
            <span
              id={`${inputId}-error`}
              className="ml-auto text-chekin-red font-sans font-medium text-[12px] leading-4 text-right"
            >
              {errorText}
            </span>
          )}
        </div>
      </div>
    );
  },
);
Textarea.displayName = 'Textarea';
