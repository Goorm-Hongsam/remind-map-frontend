import React from 'react';
import { useRecoilValue } from 'recoil';
import { groupInvitesState } from '../../../../recoil/groupAtoms';
import GroupButton from '../atom-components/GroupButton';
import { instance } from '../../../../api/customAxios';

export default function GroupInvites() {
  const arr = [1, 1, 1, 1, 1];

  const groupInvites = useRecoilValue(groupInvitesState);
  const addGroupMember = async groupId => {
    console.log(groupId);
    try {
      const result = await instance.post(`/group/member/add/${groupId}`);
      console.log('그룹에 멤버 추가 성공! : ', result.data);
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
    <div className="bg-black text-white fixed right-0 top-10">
      {groupInvites.map((el, i) => {
        return (
          <div key={el.leaderId} className="flex gap-2 p-2">
            <p className="" key={i}>
              {el.nickname}님이 {el.title} 그룹에 초대하셨습니다!
            </p>
            <GroupButton
              type="Button"
              text="수락"
              size="sm"
              onClick={() => {
                addGroupMember(el.groupId);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
