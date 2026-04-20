import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 select-none',
  {
    variants: {
      size: {
        xs: 'w-6 h-6 text-[10px]',
        s: 'w-8 h-8 text-[12px]',
        m: 'w-10 h-10 text-[14px]',
        l: 'w-12 h-12 text-[16px]',
      },
    },
    defaultVariants: { size: 'm' },
  },
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarVariants> {
  name: string;
  src?: string;
}

const PALETTE = [
  'bg-[#EFF6FF] text-chekin-blue',
  'bg-[#F0F3FF] text-chekin-blue',
  'bg-[#EFEFFF] text-chekin-navy',
  'bg-[#E8FCF7] text-[#0F9F80]',
  'bg-[#FFF4E5] text-[#B86A00]',
  'bg-[#FFE8EF] text-chekin-red',
  'bg-chekin-surface-input-empty text-chekin-navy',
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0] ?? '').join('').toUpperCase() || '?';
}

function paletteFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
  return PALETTE[hash % PALETTE.length];
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ className, size, name, src, ...props }, ref) => {
    const paletteClass = paletteFor(name);
    return (
      <span ref={ref} className={cn(avatarVariants({ size }), !src && paletteClass, className)} {...props}>
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="font-sans font-semibold">{initials(name)}</span>
        )}
      </span>
    );
  },
);
Avatar.displayName = 'Avatar';
