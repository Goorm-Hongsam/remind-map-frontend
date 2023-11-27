import React from 'react';
import GroupButton from './GroupButton';

export default function GroupUserCard({ member, userName, buttonText, onClick, buttonOnClick }) {
  return (
    <div
      onClick={onClick}
      className="w-full border-b border-main-color flex items-center justify-center relative gap-3 p-1"
    >
      {member.profile_thumbnail_image || member.thumbnailImageUrl ? (
        <img
          className="w-8 rounded-full"
          src={member.profile_thumbnail_image || member.thumbnailImageUrl}
          alt="유저 프로필 이미지"
        />
      ) : (
        <img
          className="w-8 rounded-full"
          src="https://k.kakaocdn.net/dn/1G9kp/btsAot8liOn/8CWudi3uy07rvFNUkk3ER0/img_110x110.jpg"
          alt="기본 프로필 이미지"
        />
      )}

      <p class="text-xs pb-1 whitespace-nowrap overflow-x-auto w-24">{userName}</p>
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
