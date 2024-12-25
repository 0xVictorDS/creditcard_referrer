'use client';
import React, { useState, useEffect } from 'react';

const AnimatedHeadline = ({ text }: { text: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: { clientX: number; clientY: number }) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const getTransformStyle = (x: number, y: number, factor: number) => {
    const offsetX = (x / window.innerWidth - 0.5) * factor;
    const offsetY = (y / window.innerHeight - 0.5) * factor;
    return {
      transform: `translate(${offsetX}px, ${offsetY}px)`,
    };
  };
  return (
    <h2 className='flex items-center justify-center text-center text-[160px] font-bold uppercase text-[#F5F5F5] mobile:text-[60px] leading-none'>
      {text}
      <div className='relative'>
        <span
          className='text_stroke_white -ml-28 block text-[190px] opacity-25 mobile:text-[60px] leading-none'
          style={getTransformStyle(mousePosition.x, mousePosition.y, 50)}
        >
          {text}
        </span>
        <span
          className='text_stroke_white absolute left-0 top-4 -ml-28 text-[190px] opacity-25 mobile:text-[60px] leading-none'
          style={getTransformStyle(mousePosition.x, mousePosition.y, 20)}
        >
          {text}
        </span>
      </div>
    </h2>
  );
};

export default AnimatedHeadline;
