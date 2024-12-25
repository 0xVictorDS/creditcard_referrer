import React from 'react';

export default function RadialProgress({ progress }: { progress: number }) {
  return (
    <div
      className='inline-flex items-center justify-center overflow-hidden rounded-full'
      x-data='scrollProgress'
    >
      <svg className='h-20 w-20'>
        <circle
          className='text-gray-300'
          cx='40'
          cy='40'
          fill='transparent'
          r='30'
          stroke='currentColor'
          strokeWidth={'4'}
        />
        <circle
          className='text-black'
          cx='40'
          cy='40'
          fill='transparent'
          r='30'
          stroke='currentColor'
          strokeDasharray={30 * 2 * Math.PI}
          strokeDashoffset={100 - (progress / 100) * 100}
          strokeLinecap='round'
          strokeWidth='4'
        />
      </svg>
      <span className='absolute text-sm text-black' x-text='`${percent}%`'>
        {progress}%
      </span>
    </div>
  );
}
