import React, { useState } from 'react';
import GroupInput from '../atom-components/GroupInput';
import useGroup from '../../../../hooks/useGroup';
import { useMatch, useNavigate } from 'react-router-dom';

export default function GroupCreate() {
  const [groupTitle, setGroupTitle] = useState('');
  const { createGroup } = useGroup();
  const navigate = useNavigate();
  const isTabCreate = useMatch('/grouptab/create/:id');
  const isCreate = useMatch('/group/create/:id');
  return (
    <div className="flex flex-col items-center gap-5 mt-10 transition-all">
      <h1 className="text-xl">그룹 생성</h1>
      <form className="flex flex-col items-center justify-center gap-5 w-full">
        <GroupInput
          setValue={setGroupTitle}
          keyDown={() => createGroup(isTabCreate, isCreate, navigate, groupTitle)}
          buttonText="생성"
          buttonOnclick={() => createGroup(isTabCreate, isCreate, navigate, groupTitle)}
          placeholder="그룹 이름"
        />
      </form>
    </div>
  );
}
