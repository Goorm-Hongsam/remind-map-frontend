import React, { useEffect, useState } from 'react';
import styles from '../../GroupTap.module.css';
import {
  groupState,
  groupsState,
  isDatePickerState,
  seletGroupIdState,
  seletGroupIndexState,
} from '../../../../recoil/groupAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate, useParams } from 'react-router-dom';
import useGroup from '../../../../hooks/useGroup';
export default function Seleter() {
  const { groupId } = useParams();
  const navigator = useNavigate();
  const [seletGroupId, setSeletGroupId] = useRecoilState(seletGroupIdState);
  const groups = useRecoilValue(groupsState);
  const group = useRecoilValue(groupState);
  const [isGroupsList, setIsGroupsList] = useState(false);
  const { getGroup, getGroups, getGroupMarkers } = useGroup(groupId);
  const isDatePicker = useRecoilValue(isDatePickerState);
  const openGroup = () => {
    setIsGroupsList(!isGroupsList);
  };
  //List에서 그룹 선택 시 누른 그룹의 Id를 이용하여 단일 그룹정보와 단일 마커정보를 호출한다
  //url의 groupId에서도 뿌려주어 클릭 이벤트가 아닌 경우 params로 groupId를 이용할수 있다
  const seletGroup = groupId => {
    getGroup(groupId);
    getGroupMarkers(groupId);
    navigator(`/grouptab/all/${groupId}`);
    setIsGroupsList(false);
  };

  //seletGroupId의 경우 클릭이벤트에 반응하고 groupId의 경우 페이지를 벗어나거나 진입할 떄 반응한다
  useEffect(() => {
    seletGroup(seletGroupId);
  }, [groupId, seletGroupId]);

  //모달이 닫힐 경우나 열릴 경우 한번 더 요청
  //Params는 이미 클릭이벤트로 seletGroupId와 할당이 동시에 되었기 때문에 Params를 GroupId로 보내준다
  useEffect(() => {
    getGroups();
    getGroupMarkers(groupId);
  }, [isGroupsList]);

  return (
    <div
      className={`${
        isDatePicker ? 'opacity-0' : 'opacity-100'
      } w-full flex flex-col items-center justify-center relative text-sx`}
    >
      <p
        onClick={openGroup}
        className={`${styles.groupTapItem} border p-2 hover:bg-main-color hover:text-white`}
      >
        {group.title}
      </p>
      <ul
        className={`${styles.groupTapItem} ${
          isGroupsList ? styles.listOpen : styles.listClose
        } border absolute top-9 bg-white`}
      >
        {groups.map((group, i) => {
          return (
            <li
              onClick={() => {
                setSeletGroupId(group.groupId);
              }}
              key={group.groupId}
              className="p-2 border border-b hover:bg-main-color hover:text-white transition-all"
            >
              {group.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
