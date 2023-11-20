import React, { useState } from 'react';
import GroupInput from '../atom-components/GroupInput';
import axios from 'axios';
import useGroup from '../../../../hooks/useGroup';
import { useMatch, useNavigate } from 'react-router-dom';

export default function GroupCreate() {
  const [groupTitle, setGroupTitle] = useState('');
  const { getGroups } = useGroup();
  const navigate = useNavigate();
  const isTabCreate = useMatch('/grouptab/create/:id');
  const isCreate = useMatch('/group/create/:id');

  const createGroup = async () => {
    try {
      const result = await axios.post('/group/create', { groupTitle: groupTitle });
      getGroups();
      if (isTabCreate) {
        navigate(`/grouptab/all/${result.data.groupId}`);
      }
      if (isCreate) {
        navigate(`/group/detail/${result.data.groupId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 mt-20 md:mt-10 transition-all">
      <h1 className="text-4xl">그룹 생성</h1>
      <form className="flex flex-col items-center justify-center gap-5 w-full">
        <GroupInput
          setValue={setGroupTitle}
          keyDown={createGroup}
          buttonText="생성"
          buttonOnclick={createGroup}
          placeholder="그룹 이름"
        />
      </form>
    </div>
  );
}
