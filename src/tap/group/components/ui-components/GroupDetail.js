import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import GroupInput from '../atom-components/GroupInput';
import GroupUserCardWraper from '../wrap-components/GroupUserCardWraper';
import useGroup from '../../../../hooks/useGroup';
import { groupState } from '../../../../recoil/groupAtoms';

export default function GroupDetail() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const group = useRecoilValue(groupState);
  const [search, setSearch] = useState('');
  const [groupTitle, setGroupTitle] = useState('');
  const { getGroup, getGroupmembers, groupMembers, editGroup, deleteMember } = useGroup(
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
        buttonOnclick={() => {
          editGroup(navigate);
        }}
      />
      {groupMembers.length > 1 ? (
        <GroupUserCardWraper
          mambers={groupMembers}
          title="그룹원 목록"
          buttonText="삭제"
          buttonOnClick={deleteMember}
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
