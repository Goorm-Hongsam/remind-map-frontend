import React, { useState } from 'react';
import styles from '../../GroupTap.module.css';
import {
  groupState,
  groupsState,
  seletGroupIdState,
  seletGroupIndexState,
} from '../../../../recoil/groupAtoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

export default function Seleter() {
  const navigator = useNavigate();
  const setSeletGroupIndex = useSetRecoilState(seletGroupIndexState);
  const setSeletGroupId = useSetRecoilState(seletGroupIdState);
  const groups = useRecoilValue(groupsState);
  const group = useRecoilValue(groupState);
  const [isGroupsList, setIsGroupsList] = useState(false);
  const openGroup = () => {
    setIsGroupsList(!isGroupsList);
  };
  const seletGroup = groupId => {
    const groupIndex = groups.findIndex(el => {
      return el.groupId === groupId;
    });
    navigator(`/grouptab/all/${groupId}`);
    setSeletGroupId(groupId);
    setSeletGroupIndex(groupIndex);
    setIsGroupsList(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center relative z-50 text-sx">
      <p
        onClick={openGroup}
        className={`${styles.groupTapItem} border p-2 hover:bg-main-color hover:text-white`}
      >
        {group.title}
      </p>
      <ul
        className={`${styles.groupTapItem} ${
          isGroupsList ? styles.listOpen : styles.listClose
        } border absolute top-9 bg-white`}
      >
        {groups.map((group, i) => {
          return (
            <li
              onClick={() => {
                seletGroup(group.groupId);
              }}
              key={i}
              className="p-2 border border-b hover:bg-main-color hover:text-white transition-all"
            >
              {group.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
