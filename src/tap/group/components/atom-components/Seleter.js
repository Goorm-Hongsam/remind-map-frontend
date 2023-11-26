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
import useGroup from '../../../../hooks/useGroup';
export default function Seleter() {
  const seletGroupId = useRecoilValue(seletGroupIdState);
  const [groupId, setGroupId] = useState(seletGroupId);
  const navigator = useNavigate();
  const setSeletGroupIndex = useSetRecoilState(seletGroupIndexState);
  const setSeletGroupId = useSetRecoilState(seletGroupIdState);
  const groups = useRecoilValue(groupsState);
  const group = useRecoilValue(groupState);
  const [isGroupsList, setIsGroupsList] = useState(false);
  const { getGroup } = useGroup(groupId);
  const openGroup = () => {
    setIsGroupsList(!isGroupsList);
  };
  const seletGroup = groupId => {
    const groupIndex = groups.findIndex(el => {
      return el.groupId === groupId;
    });
    getGroup();
    navigator(`/grouptab/all/${groupId}`);
    setSeletGroupId(groupId);
    setSeletGroupIndex(groupIndex);
    setGroupId(seletGroupId);
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
