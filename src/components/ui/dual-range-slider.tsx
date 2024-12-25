'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

interface DualRangeSliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  labelPosition?: 'top' | 'bottom';
  label?: (value: number | undefined) => React.ReactNode;
  offset?: number;
  rangeRuler?: number;
}

const DualRangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  DualRangeSliderProps
>(
  (
    { className, label, labelPosition = 'bottom', offset = 0, rangeRuler = null, ...props },
    ref
  ) => {
    const initialValue = Array.isArray(props.value) ? props.value : [props.min, props.max];

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn('relative flex w-full touch-none select-none items-center', className)}
        style={{
          paddingBottom: labelPosition === 'bottom' ? offset : 0,
          paddingTop: labelPosition === 'top' ? offset : 0,
        }}
        {...props}
      >
        <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full bg-secondary'>
          <SliderPrimitive.Range className='absolute h-full bg-orange' />
        </SliderPrimitive.Track>
        {initialValue.map((value, index) => (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb className='relative block h-4 w-4 rounded-full border-2 border-[#96B0BD] bg-orange ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'>
              {label && (
                <span
                  className={cn(
                    'absolute flex w-full justify-center text-xs',
                    labelPosition === 'top' && '-top-7',
                    labelPosition === 'bottom' && 'top-4'
                  )}
                  style={{
                    transform: `translatey(${
                      labelPosition === 'top' ? `calc(-100% - ${offset}px)` : `${offset}px`
                    })`,
                  }}
                >
                  {index == 0 ? (
                    <span className='rounded bg-[#10191d] p-1'>{label(value)}</span>
                  ) : (
                    <span className='absolute right-0 rounded bg-[#10191d] p-1'>
                      {label(value)}
                    </span>
                  )}
                </span>
              )}
            </SliderPrimitive.Thumb>
          </React.Fragment>
        ))}
        {rangeRuler && (
          <div
            className='absolute top-full w-full'
            style={{
              transform: `translatey(-${offset / 3}px)`,
            }}
          >
            <div
              className='flex items-center justify-between px-2'
              style={{ height: offset / 3 + 'px' }}
            >
              {Array.from({ length: rangeRuler + 1 }).map((_, index) => (
                <div key={index} className='h-full w-[2px] rounded-full bg-[#1A282D]' />
              ))}
            </div>
          </div>
        )}
      </SliderPrimitive.Root>
    );
  }
);
DualRangeSlider.displayName = 'DualRangeSlider';

export { DualRangeSlider };
