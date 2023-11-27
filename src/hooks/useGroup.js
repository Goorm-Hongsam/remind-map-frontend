import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  groupMarkersState,
  groupRoutesState,
  groupState,
  groupsState,
  seletGroupIdState,
} from '../recoil/groupAtoms';
import { useState } from 'react';
import { instance } from '../api/customAxios';

const useGroup = (groupId, groupTitle) => {
  const setGroups = useSetRecoilState(groupsState);
  const setGroup = useSetRecoilState(groupState);
  const setGroupMarkers = useSetRecoilState(groupMarkersState);
  const setGroupRoutes = useSetRecoilState(groupRoutesState);
  const [seletGroupId, setSeletGroupId] = useRecoilState(seletGroupIdState);
  const [groupMembers, setGroupMembers] = useState([]);

  const getGroups = async () => {
    try {
      const result = await instance.get(`/group/getall`);
      const copyGroups = [...result.data];
      setGroups(copyGroups);
      console.log('그룹들 가져오기 : ', copyGroups);
      setSeletGroupId(copyGroups[0].groupId);
      console.log('지금 가지고 있는 그룹ID 스테이트 : ', seletGroupId);
    } catch (error) {
      console.log(error);
    }
  };
  const getGroup = async () => {
    try {
      const result = await instance.get(`/group/get/${groupId}`);
      const copyGroup = result.data;
      console.log('그룹 단건 조회 : ', copyGroup);
      setSeletGroupId(copyGroup.groupId);
      setGroup(copyGroup);
    } catch (error) {
      console.log(error);
    }
  };
  const getGroupmembers = async () => {
    try {
      const result = await instance.get(`/group/member/get/${groupId}`);
      const copyGroupMembers = [...result.data];
      console.log('그룹 친구들 복사본 : ', copyGroupMembers);
      setGroupMembers(copyGroupMembers);
    } catch (error) {
      console.log(error);
    }
  };
  const getGroupMarkers = async () => {
    try {
      const result = await instance.get(`/marker/group/${groupId}`);
      const copyGroupMarkers = [...result.data];
      console.log('그룹마커 복사본 : ', copyGroupMarkers);
      setGroupMarkers(copyGroupMarkers);
    } catch (error) {
      console.log('그룹 마커 가져오기 실패', error);
    }
  };
  const getGroupRoutes = async () => {
    try {
      const result = await instance.get(`/marker-route/group/${groupId}`);
      const copyGroupRotes = [...result.data];
      console.log('그룹마커 복사본 : ', copyGroupRotes);
      setGroupRoutes(result.data);
    } catch (error) {
      console.log('그룹 루트 가져오기 실패', error);
    }
  };
  const createGroup = async (isTabCreate, isCreate, navigate) => {
    console.log('그룹 생성 그룹 제목', groupTitle);
    try {
      const result = await instance.post('/group/create', { title: groupTitle });
      console.log(result);
      getGroups();
      if (isTabCreate) {
        navigate(`/grouptab/all/${result.data.groupId}`);
        setSeletGroupId(result.data.groupId);
      }
      if (isCreate) {
        navigate(`/group/detail/${result.data.groupId}`);
        setSeletGroupId(result.data.groupId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGroup = async () => {
    console.log('삭제할 그룹 ID : ', groupId);
    try {
      const result = await instance.post(`/group/remove/${groupId}`);
      console.log('그룹삭제 성공! : ', result);
    } catch (error) {
      console.log('그룹삭제 실패 : ', error);
    }
  };
  const editGroup = async navigate => {
    console.log('수정할 그룹명 & 그룹ID ', groupTitle, groupId);
    try {
      const result = await instance.post(`/group/edit/${groupId}`, { title: groupTitle });
      console.log('그룹수정 성공 : ', result);
      getGroup();
      setSeletGroupId(groupId);
      navigate(`/grouptab/all/${groupId}`);
    } catch (error) {
      console.log('그룹수정 실패', error);
    }
  };
  const deleteMember = async () => {
    try {
      const result = await instance.delete(`/group/member/remove/${groupId}`);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getGroups,
    getGroup,
    getGroupmembers,
    groupMembers,
    getGroupMarkers,
    getGroupRoutes,
    deleteGroup,
    editGroup,
    createGroup,
    deleteMember,
  };
};

export default useGroup;
