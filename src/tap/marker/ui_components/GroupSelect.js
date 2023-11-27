import React, { useState, useEffect } from 'react';
import styles from './GroupSelect.module.css';
import { instance } from '../../../api/customAxios';

const GroupSelect = ({ onSelect }) => {
  const [groupData, setGroupData] = useState([]);
  const [curGroupId, setCurGroupId] = useState(null);
  const [isGroups, setIsGroups] = useState(false);

  // 그룹 데이터 불러오기
  useEffect(() => {
    instance
      .get('/marker/groups') // 그룹 정보를 가져오는 API 엔드포인트
      .then(response => {
        setGroupData(response.data);
      })
      .catch(error => console.error('Error fetching groups:', error));
  }, []);

  // 그룹 선택 처리
  const selectGroup = groupId => {
    setCurGroupId(groupId);
    setIsGroups(false);
    if (typeof onSelect === 'function') {
      const selectedGroup = groupData.find(group => group.groupId === groupId);
      onSelect(selectedGroup); // 선택된 그룹 정보 전달
    }
  };
  const openGroup = () => {
    setIsGroups(!isGroups);
  };
  // 드롭다운 메뉴 토글
  const toggleGroups = () => {
    setIsGroups(!isGroups);
  };

  return (
    <div className={`${styles.routeTap} hidden`}>
      <div className="flex items-center justiy-center md:max-w-none rounded-md bg-main-color text-white shadow-md transition-all p-2 text-center hover:bg-main-hover cursor-pointer text-sm w-11/12">
        <p onClick={toggleGroups} className={`${styles.routeTapItem} rounded border p-2`}>
          {groupData.find(group => group.groupId === curGroupId)?.title || '그룹 선택'}
        </p>
        {isGroups && (
          <ul className={`${styles.routeTapItem} rounded border`}>
            {groupData.map((group, i) => (
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
