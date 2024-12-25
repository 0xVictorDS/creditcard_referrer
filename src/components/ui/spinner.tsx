import type { VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const spinnerVariants = cva('flex-col items-center justify-center', {
  variants: {
    show: {
      false: 'hidden',
      true: 'flex',
    },
  },
  defaultVariants: {
    show: true,
  },
});

const loaderVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      large: 'size-12',
      medium: 'size-8',
      small: 'size-6',
    },
  },
  defaultVariants: {
    size: 'medium',
  },
});

interface SpinnerContentProps
  extends VariantProps<typeof spinnerVariants>,
    VariantProps<typeof loaderVariants> {
  children?: React.ReactNode;
  className?: string;
}

export function Spinner({ size, show, children, className }: SpinnerContentProps) {
  return (
    <span className={spinnerVariants({ show })}>
      <Loader2 className={cn(loaderVariants({ size }), className)} />
      {children}
    </span>
  );
}
