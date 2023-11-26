import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import GroupInput from '../atom-components/GroupInput';
import GroupButton from '../atom-components/GroupButton';
import GroupUserCardWraper from '../wrap-components/GroupUserCardWraper';
import useGroup from '../../../../hooks/useGroup';
import { groupState } from '../../../../recoil/groupAtoms';

export default function GroupDetail() {
  const { groupId } = useParams();
  const group = useRecoilValue(groupState);
  const [search, setSearch] = useState('');
  const [groupTitle, setGroupTitle] = useState('');
  const { getGroup, getGroupmembers, groupMembers, deletGroup, editGroup } = useGroup(
    groupId,
    groupTitle,
  );

  useEffect(() => {
    getGroupmembers();
    getGroup();
  }, [groupId]);

  return (
    <div className="flex flex-col items-center gap-5 mt-3 transition-all">
      <h1 className="text-xl">{group.title}</h1>
      <GroupInput
        setValue={setGroupTitle}
        buttonText="수정"
        placeholder="그룹 이름 수정"
        buttonOnclick={editGroup}
      />
      {/* <GroupInput setValue={setSearch} buttonText="검색" placeholder="그룹원 찾기" /> */}
      {groupMembers.length !== 0 ? (
        <GroupUserCardWraper
          mambers={groupMembers}
          title="그룹원 목록"
          buttonText="삭제"
          buttonOnClick={() => {
            console.log('삭제');
          }}
        />
      ) : (
        <div className="text-sm flex flex-col items-center justify-center gap-2">
          <p>그룹에 아무도 없군요 ..</p>
          <p>친구를 초대해보세요!</p>
        </div>
      )}
    </div>
  );
}
