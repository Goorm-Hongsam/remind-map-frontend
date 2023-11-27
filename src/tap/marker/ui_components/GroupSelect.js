import React, { useState, useEffect } from 'react';
import styles from './GroupSelect.module.css';
import { instance } from '../../../api/customAxios';

//useGroup.js:31 지금 가지고 있는 그룹ID 스테이트 :  3
const GroupSelect = ({ selectedGroupId, onSelect }) => {
  console.log(onSelect);
  const [groupData, setGroupData] = useState();

  const [curGroup, setCurGroup] = useState(0);
  const [curGroupId, setCurGroupId] = useState(0);
  useEffect(() => {
    if (curGroupId) {
      instance
        .get(`/marker/group/${curGroupId}`)
        .then(response => {
          setGroupData(response.data); // 데이터를 상태에 저장
        })
        .catch(e => {
          console.log('에러 발생:', e);
        });
    }
  }, [curGroupId]);
  const [isGroups, setIsGroups] = useState(false);
  const selectGroup = groupId => {
    setCurGroupId(groupId);
    const selectIndex = selectedGroupId.findIndex(e => {
      //여기서
      return e.groupId === groupId;
    });
    setCurGroup(selectIndex);
    setIsGroups(false);
    const selectedGroup = groupData.filter(marker => marker.groupId === groupId);
    if (typeof onSelect === 'function') {
      onSelect(selectedGroup);
    }
    console.log(selectedGroup);
  };
  const openGroup = () => {
    setIsGroups(!isGroups);
  };
  console.log(groupData);

  return (
    <div className={styles.routeTap}>
      <div className="w-full flex flex-col items-center justify-center ">
        <p onClick={openGroup} className={`${styles.routeTapItem} rounded border p-2`}>
          {/* 현재 선택된 그룹의 제목을 표시 */}
          {selectedGroupId.find(group => group.groupId === curGroupId)?.title || '그룹 선택'}
        </p>
        {isGroups && (
          <ul className={`${styles.routeTapItem} rounded border`}>
            {selectedGroupId.map((group, i) => (
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
