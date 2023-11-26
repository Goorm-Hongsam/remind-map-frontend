import React from 'react';

import GroupButton, { ButtonVariants } from '../atom-components/GroupButton';
import { cn } from '../../../../util/cn';

export default function GroupCard({ group, onClick, bg, size }) {
  return (
    <div className={cn(ButtonVariants({ bg, size }))} onClick={() => onClick(group.groupId)}>
      <div className="w-full md:w-6/12 h-32 hidden md:flex items-center justify-center">
        <img
          className="md:w-20"
          src="https://img.icons8.com/?size=128&id=ckaioC1qqwCu&format=png"
          alt=""
        />
      </div>
      <p className="w-full md:w-6/12 text-md md:text-lg">{group.groupTitle}</p>
    </div>
  );
}
