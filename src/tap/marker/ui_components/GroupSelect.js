import React, { useState, useEffect } from 'react';
import styles from './GroupSelect.module.css';
import { instance } from '../../../api/customAxios';

//useGroup.js:31 지금 가지고 있는 그룹ID 스테이트 :  3
const GroupSelect = ({ groups, onSelect }) => {
  const [curGroupId, setCurGroupId] = useState(0);
  const [isGroups, setIsGroups] = useState(false);
  console.log(groups, onSelect);
  useEffect(() => {
    if (curGroupId) {
      instance
        .get(`/marker/group/${curGroupId}`)
        .then(response => {
          if (typeof onSelect === 'function') {
            onSelect(response.data);
            console.log(response.data);
          }
        })
        .catch(e => {
          console.log('에러 발생:', e);
        });
    }
  }, [curGroupId]);

  const selectGroup = groupId => {
    setCurGroupId(groupId);
    setIsGroups(false);
  };

  const openGroup = () => {
    setIsGroups(!isGroups);
  };

  return (
    <div className={styles.routeTap}>
      <div className="w-full flex flex-col items-center justify-center ">
        <p onClick={openGroup} className={`${styles.routeTapItem} rounded border p-2`}>
          {/* 현재 선택된 그룹의 제목을 표시 */}
          {groups.find(group => group.groupId === curGroupId)?.title || '그룹 선택'}
        </p>
        {isGroups && (
          <ul className={`${styles.routeTapItem} rounded border`}>
            {groups.map((group, i) => (
              <li
                key={i}
                onClick={() => selectGroup(group.groupId)}
                className="p-2 border border-b"
              >
                {group.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GroupSelect;
