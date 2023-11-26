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
import axios from 'axios';
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
      if (seletGroupId === 0) {
        setSeletGroupId(copyGroups[0].groupId);
        console.log('최초 진입 시 그룹ID : ', seletGroupId);
      } else {
        setSeletGroupId(groupId);
      }
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

  //try catch 지우기
  //비동기 없이
  //뒤 함ㄴ수 지우고
  // 1. 기본
  const createGroup = async (isTabCreate, isCreate, navigate, groupTitle) => {
    console.log('그룹 생성 그룹 제목', groupTitle);
    try {
      const result = await instance.post('/group/create', { title: groupTitle });
      console.log(result);
      getGroups();
      // if (isTabCreate) {
      //   navigate(`/grouptab/all/${result.data.groupId}`);
      //   setSeletGroupId(result.data.groupId);
      // }
      // if (isCreate) {
      //   navigate(`/group/detail/${result.data.groupId}`);
      //   setSeletGroupId(result.data.groupId);
      // }
    } catch (error) {
      console.log(error);
    }
  };
  // 2.비동기 제거
  // const createGroup = (isTabCreate, isCreate, navigate, groupTitle) => {
  //   console.log('그룹 생성 그룹 제목', groupTitle);
  //   try {
  //     const result = instance.post('/group/create', { title: groupTitle });
  //     console.log(result);
  //     getGroups();
  //     if (isTabCreate) {
  //       navigate(`/grouptab/all/${result.data.groupId}`);
  //       setSeletGroupId(result.data.groupId);
  //     }
  //     if (isCreate) {
  //       navigate(`/group/detail/${result.data.groupId}`);
  //       setSeletGroupId(result.data.groupId);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // try-catch 제거
  // const createGroup = async (isTabCreate, isCreate, navigate, groupTitle) => {
  //   await instance
  //     .post('/group/create', { title: groupTitle })
  //     .then(res => {
  //       console.log(res);
  //       getGroups();
  //       if (isTabCreate) {
  //         navigate(`/grouptab/all/${res.data.groupId}`);
  //         setSeletGroupId(res.data.groupId);
  //       }
  //       if (isCreate) {
  //         navigate(`/group/detail/${res.data.groupId}`);
  //         setSeletGroupId(res.data.groupId);
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  // try-catch , 비동기 제거
  // const createGroup = (isTabCreate, isCreate, navigate, groupTitle) => {
  //   instance
  //     .post('/group/create', { title: groupTitle })
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // };
  const deletGroup = async () => {
    try {
      const result = await instance.delete(`/group/remove/${groupId}`);
      console.log('그룹삭제 성공! : ', result);
    } catch (error) {
      console.log('그룹삭제 실패 : ', error);
    }
  };
  const editGroup = async () => {
    console.log('수정할 그룹명', groupTitle);
    try {
      const result = await instance.post(`/group/edit/${groupId}`, { title: groupTitle });
      console.log('그룹수정 성공 : ', result);
    } catch (error) {
      console.log('그룹수정 실패', error);
    }
  };

  return {
    getGroups,
    getGroup,
    getGroupmembers,
    groupMembers,
    getGroupMarkers,
    getGroupRoutes,
    deletGroup,
    editGroup,
    createGroup,
  };
};

export default useGroup;
