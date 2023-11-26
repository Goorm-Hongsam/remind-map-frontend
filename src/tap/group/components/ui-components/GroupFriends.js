import React, { useEffect, useState } from 'react';
import GroupButton from '../atom-components/GroupButton';
import GroupInput from '../atom-components/GroupInput';
import GroupUserCardWraper from '../wrap-components/GroupUserCardWraper';
import useFriends from '../../../../hooks/useFriends';
import { useParams } from 'react-router-dom';
import useGroup from '../../../../hooks/useGroup';

const { Kakao } = window;
export default function GroupFriends() {
  const { groupId } = useParams();
  const [filterFriends, setFilterFriends] = useState([]);
  const [isInformationModal, setIsInformationModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { getFriends, friends, sendMessage, sendInGroup, getGroupInvite } = useFriends(groupId);
  const { deleteGroup, getGroupmembers, groupMembers } = useGroup(groupId);

  const searchFriend = () => {
    console.log(searchValue);
  };

  useEffect(() => {
    getFriends();
    getGroupmembers();
    getGroupInvite();
    console.log(groupMembers.length);
    console.log(friends);
  }, [groupId]);

  useEffect(() => {
    const copyFriends = friends.filter(
      friend => !groupMembers.some(groupMember => groupMember.memberId === friend.id),
    );
    setFilterFriends(copyFriends);
    console.log('중복제거 친구', filterFriends);
  }, [groupId, groupMembers, friends]);

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
      templateId: 101207,
      templateArgs: {
        title: '제목 영역입니다.',
        description: '설명 영역입니다.',
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-5 mt-10 transition-all">
      {/* <GroupInput buttonText="검색" placeholder="친구 찾기" /> */}
      <GroupUserCardWraper
        mambers={filterFriends}
        title="친구 목록"
        buttonText="초대"
        buttonOnClick={submitInvite}
        inputButtonText="검색"
        inputPlaceholder="친구 찾기"
        inputSetValue={setSearchValue}
        inputButtonOnclick={searchFriend}
      />
      <div className="flex flex-col items-center justify-center gap-2 w-full mt-3 relative">
        {isInformationModal && groupMembers.length === 1 && (
          <div className="flex flex-col gap-1 border w-full p-3 text-center rounded-md text-xs absolute z-10 bg-white bottom-20 opacity-80">
            <p>친구목록에 없는 친구는</p>
            <p>RemindMap에 가입해야</p>
            <p>서비스를 이용할수 있습니다!</p>
            <p>링크를 공유해 친구를 초대해보세요</p>
          </div>
        )}

        <GroupButton
          text="카카오 친구 초대"
          type="Button"
          onClick={shareKakao}
          onMouseOver={() => {
            setIsInformationModal(true);
          }}
          onMouseleave={() => {
            setIsInformationModal(false);
          }}
          bg="kakao"
        />
        <GroupButton type="Button" text="그룹 삭제" onClick={deleteGroup} bg="red" />
      </div>
    </div>
  );
}
