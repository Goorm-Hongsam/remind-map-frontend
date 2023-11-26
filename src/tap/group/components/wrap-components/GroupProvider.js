import React from 'react';
import GroupList from '../GroupList';
import GroupFriends from '../GroupFriends';

export default function GroupHome({ children }) {
  return (
    <div>
      <div className="flex mt-10">
        <GroupList />
        <div className="flex flex-col items-center w-full md:w-6/12 gap-5 mt-20 md:mt-10 transition-all">
          {children}
        </div>
        <GroupFriends />
      </div>
    </div>
  );
}
