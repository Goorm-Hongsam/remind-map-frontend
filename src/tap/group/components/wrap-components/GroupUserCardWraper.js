import React from 'react';
import GroupUserCard from '../atom-components/GroupUserCard';

export default function GroupUserCardWraper({ mambers, title, buttonText, buttonOnClick }) {
  return (
    <div className="flex items-center flex-col gap-5 w-full overflow-y-scroll max-h-60">
      <p className="text-2xl">{title}</p>
      <div className="w-full flex flex-col gap-3">
        {mambers.map((member, i) => {
          return (
            <GroupUserCard
              key={i}
              member={member}
              userName={member.nickname || member.profile_nickname || member.userName}
              buttonText={buttonText}
              buttonOnClick={buttonOnClick}
            />
          );
        })}
      </div>
    </div>
  );
}
