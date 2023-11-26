import React from 'react';
import GroupUserCard from '../atom-components/GroupUserCard';
import GroupInput from '../atom-components/GroupInput';

export default function GroupUserCardWraper({
  mambers,
  title,
  buttonText,
  buttonOnClick,
  inputSetValue,
  inputPlaceholder,
  inputButtonText,
  inputButtonOnclick,
}) {
  return (
    <div className="flex items-center flex-col gap-5 w-full">
      <p className="text-xl">{title}</p>
      {inputSetValue && (
        <GroupInput
          setValue={inputSetValue}
          buttonText={inputButtonText}
          placeholder={inputPlaceholder}
          buttonOnclick={inputButtonOnclick}
          keyDown={inputButtonOnclick}
        />
      )}
      <div className="w-full flex flex-col gap-3 overflow-y-scroll max-h-60">
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
