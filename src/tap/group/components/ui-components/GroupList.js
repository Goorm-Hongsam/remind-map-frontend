import React, { useState } from 'react';
import GroupCard from '../atom-components/GroupCard';
import Styles from './GroupList.module.css';
import GroupButton from '../atom-components/GroupButton';
import { useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import { groupsState } from '../../../../recoil/groupAtoms';

export default function GroupList() {
  const navigator = useNavigate();
  const { groupId } = useParams();
  const groups = useRecoilValue(groupsState);
  console.log('groups', groups);

  const redirectGroup = id => {
    navigator(`/group/detail/${id}`);
  };
  return (
    <div
      className={`${Styles.GroupList} fixed md:sticky w-screen md:w-80 flex md:flex-col items-center overflow-x-scroll md:overflow-y-scroll gap-3 p-2`}
    >
      <GroupButton type="Link" url="/group/create" text="그룹 만들기" className="" />
      {groups.map((group, i) => {
        return (
          <GroupCard
            key={i}
            group={group}
            onClick={redirectGroup}
            bg={+groupId === group.groupId && 'hover'}
          />
        );
      })}
    </div>
  );
}
