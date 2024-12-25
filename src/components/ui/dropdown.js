import React, { forwardRef, useState } from 'react';

export default forwardRef(function CustomIconDropDown(
  { options, onChange, value, optionLabel },
  ref
) {
  const [open, setOpen] = useState(false);
  const onClick = (v) => {
    onChange(v);
    setOpen(false);
  };

  return (
    <div className='relative cursor-pointer' ref={ref}>
      <div
        className={'flex flex-row items-center gap-2 rounded-[10px] bg-[#1B272C] p-2'}
        onClick={() => setOpen((prev) => !prev)}
      >
        {value?.[optionLabel]}
        <svg
          fill='none'
          height='6'
          viewBox='0 0 12 6'
          width='12'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M11.1426 0.759766L7.02642 4.87593C6.54031 5.36204 5.74485 5.36204 5.25874 4.87593L1.14258 0.759766'
            stroke='#96B0BD'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit='10'
            strokeWidth='1.5'
          />
        </svg>
      </div>

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 top-full mt-1 w-full rounded-[10px] bg-[#1B272C] shadow-md ${
          open ? 'visible' : 'hidden'
        }`}
      >
        <div className='flex flex-col items-start gap-2'>
          {options?.map((v, i) => (
            <div
              className='flex w-full cursor-pointer items-center gap-2 rounded-[5px] p-2 hover:bg-[#2B3942]'
              key={i}
              onClick={() => onClick(v)}
            >
              {v?.icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
