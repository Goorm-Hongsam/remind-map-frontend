import React, { useEffect, useState } from 'react';

import GroupButton from '../atom-components/GroupButton';
import GroupInput from '../atom-components/GroupInput';
import GroupUserCardWraper from '../wrap-components/GroupUserCardWraper';
import useFriends from '../../../../hooks/useFriends';
import { useParams } from 'react-router-dom';
import useGroup from '../../../../hooks/useGroup';

const { Kakao } = window;
export default function GroupFriends() {
  const getId = arr => {
    arr.forEach(el => {});
  };
  const { groupId } = useParams();
  const [filterFriends, setFilterFriends] = useState([]);

  const { getFriends, friends, sendMessage, sendInGroup } = useFriends(groupId);
  const { deletGroup, getGroupmembers, groupMembers } = useGroup(groupId);
  getFriends();
  getGroupmembers();
  useEffect(() => {
    console.log(groupMembers);
    console.log(friends);
  }, [groupId]);

  useEffect(() => {
    // 다른 상태 또는 프로퍼티가 업데이트될 때만 수행
    const copyFriends = friends.filter(
      friend => !groupMembers.some(groupMember => groupMember.memberId === friend.id),
    );
    setFilterFriends(copyFriends);
    console.log('중복제거 친구', filterFriends);
  }, [filterFriends, groupId]);

  const submitInvite = member => {
    sendMessage(member);
    sendInGroup(member);
  };

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_KAKAO_API_KEY);
    console.log(Kakao.isInitialized());
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendCustom({
      templateId: 100406,
      templateArgs: {
        title: '제목 영역입니다.',
        description: '설명 영역입니다.',
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-5 mt-10 transition-all">
      <h1 className="text-xl">초대할수 있는 친구목록</h1>
      <GroupInput buttonText="검색" placeholder="친구 찾기" />
      <GroupUserCardWraper
        mambers={filterFriends}
        title="친구 목록"
        buttonText="초대"
        buttonOnClick={submitInvite}
      />
      <div className="flex flex-col items-center justify-center gap-2 w-full mt-3">
        <div className="border w-full p-3 text-center rounded-md text-sm">
          <p>카카오톡 친구를</p>
          <p>초대해보세요!</p>
        </div>
        <GroupButton text="카카오 친구 초대" type="Button" onClick={shareKakao} />
        <GroupButton type="Button" text="그룹 삭제" onClick={deletGroup} bg="red" />
      </div>
    </div>
  );
}
