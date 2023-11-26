import React from 'react';
import GroupButton from './GroupButton';

export default function GroupInput({ buttonText, setValue, keyDown, buttonOnclick, placeholder }) {
  return (
    <div className="border-b border-main-color flex relative w-full text-xs">
      <input
        onChange={e => {
          setValue(e.target.value);
        }}
        onKeyDown={e => {
          if (e.nativeEvent.isComposing) {
            // isComposing 이 true 이면 조합 중이므로 동작을 막는다.
            return;
          }
          if (e.key === 'Enter') {
            e.preventDefault();
            keyDown();
          }
        }}
        type="text"
        className="w-full pb-1"
        placeholder={placeholder}
      />
      {buttonText && (
        <GroupButton
          type="Button"
          text={buttonText}
          onClick={buttonOnclick}
          position="inInput"
          size="sm"
          className="bg-main-color text-white px-1 border rounded-md"
        />
      )}
    </div>
  );
}
