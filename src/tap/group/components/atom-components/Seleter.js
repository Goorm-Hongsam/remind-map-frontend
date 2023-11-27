import React, { useEffect, useState } from 'react';
import styles from '../../GroupTap.module.css';
import {
  groupState,
  groupsState,
  seletGroupIdState,
  seletGroupIndexState,
} from '../../../../recoil/groupAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import useGroup from '../../../../hooks/useGroup';
export default function Seleter() {
  const { groupId } = useParams();
  const navigator = useNavigate();
  const [seletGroupId, setSeletGroupId] = useRecoilState(seletGroupIdState);
  const groups = useRecoilValue(groupsState);
  const group = useRecoilValue(groupState);
  const [isGroupsList, setIsGroupsList] = useState(false);
  const { getGroup, getGroups } = useGroup(groupId);
  const openGroup = () => {
    setIsGroupsList(!isGroupsList);
  };
  const seletGroup = groupId => {
    getGroup(groupId);
    navigator(`/grouptab/all/${groupId}`);
    setIsGroupsList(false);
  };

  useEffect(() => {
    seletGroup(seletGroupId);
  }, [groupId, seletGroupId]);

  useEffect(() => {
    getGroups();
  }, [isGroupsList]);

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
                setSeletGroupId(group.groupId);
              }}
              key={group.groupId}
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
