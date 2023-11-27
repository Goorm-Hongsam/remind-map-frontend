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
  const { getGroupmembers, groupMembers, editGroup, deleteMember } = useGroup(groupId, groupTitle);

  useEffect(() => {
    getGroupmembers();
  }, [groupId]);
  return (
    <div className="flex flex-col items-center gap-5 mt-3 transition-all">
      <h1 className="text-2xl">{group.title}</h1>
      <GroupInput
        setValue={setGroupTitle}
        buttonText="수정"
        placeholder="그룹 이름 수정"
        buttonOnclick={() => {
          editGroup(navigate);
        }}
        keyDown={() => {
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
        <div className="text-sm flex flex-col items-center justify-center gap-3">
          <p>그룹에 혼자이시군요 ?</p>
          <p className="">친구를 초대해보시는건 어떨까요 ?</p>
          <p className="text-5xl bounce mt-3">👇</p>
        </div>
      )}
    </div>
  );
}
