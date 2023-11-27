import React, { useState, useEffect } from 'react';
import styles from './GroupSelect.module.css';
import { instance } from '../../../api/customAxios';

//useGroup.js:31 지금 가지고 있는 그룹ID 스테이트 :  3
const GroupSelect = ({ groups, groupId, onSelect }) => {
  console.log(groups);
  console.log(groupId);
  console.log(onSelect);
  const [groupData, setGroupData] = useState();
  useEffect(() => {
    instance
      .get(`/marker/group/${groupId}`)
      .then(response => {
        console.log(response);
        setGroupData(response);
      })
      .catch(e => {
        console.log('토큰이 유효하지 않습니다.', e);
      });
  }, []);

  const [curGroup, setCurGroup] = useState(0);
  const [curGroupId, setCurGroupId] = useState(0);
  const [isGroups, setIsGroups] = useState(false);
  const selectGroup = groupId => {
    const selectIndex = groups.findIndex(e => {
      //여기서
      return e.groupId === groupId;
    });
    setCurGroup(selectIndex);
    setCurGroupId(groupId);
    setIsGroups(false);
    const selectedGroup = groupData.filter(marker => marker.groupId === groupId);
    if (typeof onSelect === 'function') {
      onSelect(selectedGroup);
    }
  };
  const openGroup = () => {
    setIsGroups(!isGroups);
  };
  console.log(groupData);
  return (
    <div className={styles.routeTap}>
      <div className="w-full flex flex-col items-center justify-center ">
        <p onClick={openGroup} className={`${styles.routeTapItem} rounded border p-2`}>
          {groups.title}
        </p>
        {isGroups ? (
          <ul className={`${styles.routeTapItem} rounded border`}>
            {groups.map((group, i) => {
              return (
                <li
                  onClick={() => {
                    selectGroup(group.groupId);
                  }}
                  key={i}
                  className="p-2 border border-b"
                >
                  {group.title}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default GroupSelect;
