import { useState } from 'react';
import { instance } from '../api/customAxios';
import { groupInvitesState, groupState } from '../recoil/groupAtoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import useGroup from './useGroup';

const useFriends = groupId => {
  const [friends, setFriends] = useState([]);

  const group = useRecoilValue(groupState);
  const setGroupInvites = useSetRecoilState(groupInvitesState);

  const getFriends = async () => {
    try {
      const result = await instance.get('/group/friends');
      console.log('백에서 보내준 친구목록 :', result.data.elements);
      const copyFriends = [...result.data.elements];
      console.log('친구목록 복사본 :', copyFriends);
      setFriends(copyFriends);
    } catch (error) {
      console.log('친구목록 불러오기 실패', error);
      setFriends([
        { uuid: 'asdasd', id: 123213, profile_nickname: '친구1' },
        { uuid: 'ㅇㅇ', id: 123213, profile_nickname: '친규2' },
      ]);
      console.log(error);
    }
  };
  const sendMessage = async member => {
    const uuids = [];
    uuids.push(member.uuid);
    console.log('메시지 전송을 위한 데이터 :', uuids, group.title, group.groupId);
    try {
      const result = await instance.post('/group/messages', {
        uuid: uuids,
        groupId: group.groupId,
        groupName: group.groupTitle,
      });
      console.log(uuids, group);
      console.log('메시지 전공 성공 :', result);
    } catch (error) {
      console.log(error);
    }
  };
  const sendInGroup = async member => {
    const ids = [];
    ids.push({ memberId: member.id });
    console.log('그룹 초대DB 요청 데이터 groupId , memberId', groupId, ids);
    try {
      const result = await instance.post(`/invite/${groupId}`, ids);
      console.log('초대 완료 :', result);
    } catch (error) {
      console.log(error);
    }
  };
  const getGroupInvite = async () => {
    try {
      const result = await instance.get('/invite/getall');
      console.log('초대목록 불러오기 성공', result);
      console.log('초대목록 불러오기 성공', result.data);
      const copyInvites = [...result.data];
      console.log('초대목록 복사본 : ', copyInvites);
      setGroupInvites(copyInvites);
    } catch (error) {
      console.log('초대목록 불러오기 실패 : ', error);
    }
  };
  return { getFriends, friends, sendMessage, sendInGroup, getGroupInvite };
};

export default useFriends;
