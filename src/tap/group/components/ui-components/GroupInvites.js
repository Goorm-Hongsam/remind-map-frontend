import React from 'react';
import { useRecoilValue } from 'recoil';
import { groupInvitesState } from '../../../../recoil/groupAtoms';
import GroupButton from '../atom-components/GroupButton';
import { instance } from '../../../../api/customAxios';
import useGroup from '../../../../hooks/useGroup';

export default function GroupInvites(setIsInvites) {
  const groupInvites = useRecoilValue(groupInvitesState);
  const { getGroupInvites } = useGroup();
  const addGroupMember = async groupId => {
    console.log(groupId);
    try {
      const result = await instance.get(`/group/member/add/${groupId}`);
      console.log('그룹에 멤버 추가 성공! : ', result.data);
      getGroupInvites();
      setIsInvites(false);
      setIsInvites(true);
    } catch (error) {
      console.log('그룹에 멤버 추가 실패! : ', error);
    }
  };
  // const groupInvites = [
  //   { nickname: '이동우', title: 'Test', groupId: 1, memberId: 3179769655, leaderId: 3182683176 },
  //   {
  //     nickname: '박서연',
  //     title: 'ㅁㅁㅁ',
  //     groupId: 2,
  //     memberId: 31797696155,
  //     leaderId: 31821683176,
  //   },
  // ];
  return (
    <div className="fixed right-0 top-10">
      {groupInvites.map((el, i) => {
        return (
          <div
            key={el.leaderId}
            className="flex gap-2 p-2 text-xs items-center justify-between rounded-md bg-white border-b border-r border-l border-main-color"
          >
            <p className="" key={i}>
              {el.nickname}님이 {el.title} 그룹에 초대하셨습니다!
            </p>
            <div className="flex gap-1">
              <GroupButton
                type="Button"
                text="수락"
                size="sm2"
                onClick={() => {
                  addGroupMember(el.groupId);
                }}
              />
              <GroupButton
                type="Button"
                text="거절"
                size="sm"
                bg="red"
                onClick={() => {
                  addGroupMember(el.groupId);
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
