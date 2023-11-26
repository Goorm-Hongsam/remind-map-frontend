import React from 'react';
import GroupButton from './GroupButton';

export default function GroupUserCard({ member, userName, buttonText, onClick, buttonOnClick }) {
  return (
    <div
      onClick={onClick}
      className="w-full border-b border-main-color items-center justify-center relative flex gap-3 p-1"
    >
      {member.profile_thumbnail_image ? (
        <img className="w-8 rounded-full" src={member.profile_thumbnail_image} alt="" />
      ) : (
        <img
          className="w-8 rounded-full"
          src="https://img.icons8.com/?size=128&id=ckaioC1qqwCu&format=png"
          alt=""
        />
      )}

      <p className="text-sm pb-1">{userName}</p>
      <div className="grow" />
      {buttonText && (
        <GroupButton
          type="Button"
          text={buttonText}
          onClick={() => buttonOnClick(member)}
          position="inInput"
          size="sm"
        />
      )}
    </div>
  );
}
