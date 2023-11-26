import React, { useEffect, useState } from 'react';

import GroupButton from '../atom-components/GroupButton';
import GroupInput from '../atom-components/GroupInput';
import GroupUserCardWraper from '../wrap-components/GroupUserCardWraper';
import useFriends from '../../../../hooks/useFriends';
import { useParams } from 'react-router-dom';
import useGroup from '../../../../hooks/useGroup';
export default function GroupFriends() {
  const { groupId } = useParams();
  const [member, setMember] = useState({});
  const { getFriends, friends, sendMessage, sendInGroup } = useFriends(member);
  const { deletGroup } = useGroup();

  useEffect(() => {
    getFriends();
  }, [groupId]);
  const submitInvite = member => {
    setMember(member);
    sendMessage(member);
    sendInGroup(member);
  };

  return (
    <div className="flex flex-col items-center gap-5 mt-20 md:mt-10 transition-all">
      <h1 className="text-xl">초대할수 있는 친구목록</h1>

      <GroupInput buttonText="검색" placeholder="친구 찾기" />
      <GroupUserCardWraper
        mambers={friends}
        title="친구 목록"
        buttonText="초대"
        buttonOnClick={submitInvite}
      />
      <div className="flex flex-col items-center justify-center gap-2 w-full mt-3">
        <div className="border w-full p-3 text-center rounded-md text-sm">
          <p>카카오톡 친구를</p>
          <p>초대해보세요!</p>
        </div>

        <GroupButton text="카카오 친구 초대" type="Button" />
        <GroupButton type="Button" text="그룹 삭제" onClick={deletGroup} bg="red" />
      </div>
    </div>
  );
}
