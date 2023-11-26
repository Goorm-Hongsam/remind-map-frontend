import React, { useEffect } from 'react';
import styles from '../../GroupTap.module.css';
import { useRecoilValue } from 'recoil';
import { groupsState, seletGroupIndexState } from '../../../../recoil/groupAtoms';
import useGroup from '../../../../hooks/useGroup';
import { useParams } from 'react-router-dom';

export default function GroupDetailTap({ isDetailGroup }) {
  const { type, groupId } = useParams();
  const groups = useRecoilValue(groupsState);
  const seletGroupIndex = useRecoilValue(seletGroupIndexState);
  const { getGroupmembers, groupMembers } = useGroup(groupId);
  useEffect(() => {
    getGroupmembers();
  });
  return (
    <div
      className={`${styles.groupDetailTap} fixed left-20 ${
        isDetailGroup ? styles.open : styles.close
      } `}
    >
      <div className="">
        <h1>{groups[seletGroupIndex].groupTitle}</h1>

        {groupMembers.map((member, i) => {
          return <p key={i}>{member.nickname}</p>;
        })}
      </div>
    </div>
  );
}
