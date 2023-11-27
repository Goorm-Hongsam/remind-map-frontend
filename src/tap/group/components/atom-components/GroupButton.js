import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../../../util/cn';
import { cva } from 'class-variance-authority';
export const ButtonVariants = cva(
  `flex w-full items-center justiy-center md:max-w-none rounded-md bg-main-color text-white shadow-md transition-all p-2 text-center hover:bg-main-hover cursor-pointer text-sm`,
  {
    variants: {
      bg: {
        default: `bg-main-color`,
        hover: `bg-main-hover`,
        red: `bg-red-400 hover:bg-red-500 text-black`,
        kakao: `bg-kakao-color text-black hover:bg-kakao-hover`,
      },
      text: {
        white: `text-white`,
        black: 'text-black',
      },
      size: {
        wfull: `w-full`,
        w90: `w-11/12`,
        sm: `w-10 h-6 text-xs p-1 mb-1.5`,
        sm2: `w-10 h-6 text-xs p-1`,
        md: ``,
        lg: ``,
        icon: `w-10 h-full bg-inherit border-none shadow-none text-main-color rounded-full hover:bg-sub-hover transition-all pl-0`,
      },
      type: {
        default: ``,
        groupCard: ``,
      },
    },
    defaultVariants: {
      variants: 'default',
      size: 'default',
    },
  },
);
export default function GroupButton({
  text,
  type,
  url,
  onClick,
  bg,
  size,
  position,
  onMouseOver,
  onMouseleave,
}) {
  return (
    <div className={cn(ButtonVariants({ bg, size, position }))}>
      {type === 'Link' && (
        <Link className="w-full" to={url}>
          {text}
        </Link>
      )}
      {type === 'Button' && (
        <button
          className="w-full"
          type="button"
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseleave}
        >
          {text}
        </button>
      )}
    </div>
  );
}
