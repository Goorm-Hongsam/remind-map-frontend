import React from 'react';

export default function GroupInvites() {
  const arr = [1, 1, 1, 1, 1];
  return (
    <div className="bg-black text-white fixed right-0 top-10">
      {arr.map((el, i) => {
        return (
          <p className="p-1" key={i}>
            초대리스트
          </p>
        );
      })}
    </div>
  );
}
