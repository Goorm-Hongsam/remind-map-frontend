import React, { useState, useEffect } from 'react';
import styles from './RouteTap.module.css';
import { groupMarkers, groups, routeMaker } from './data';
import Posting from '../../common/userposting/Posting';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import MarkerSelectModal from './ui_components/MarkerSelectModal';
import RouteModal from './ui_components/RouteModal';
import { useParams } from 'react-router';
import { useRecoilValue } from 'recoil';
import { groupsState } from '../../recoil/groupAtoms';
import { instance } from '../../api/customAxios';
import Selecter from '../group/components/atom-components/Seleter';
import useGroup from '../../hooks/useGroup';

const RouteTap = ({ onDataFromRouteTap }) => {
  const [curGroup, setCurGroup] = useState(0);
  const [curGroupId, setCurGroupId] = useState(0);
  const [isGroups, setIsGroups] = useState(false);
  const [activeButton, setActiveButton] = useState('');
  const [groupMarkerD, setGroupMarkerD] = useState([groupMarkers]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMarkersData, setSelectedMarkersData] = useState([]); //이거는 사용
  const [routeModalVisible, setRouteModalVisible] = useState(false);
  const [selectedRouteData, setSelectedRouteData] = useState('');
  const { groupId } = useParams();

  const [group, setGroupId] = useState(null);
  const groups = useRecoilValue(groupsState);
  const [routeId, setRouteId] = useState(null);
  const { getGroup, getGroups } = useGroup();
  useEffect(() => {
    getGroups();
    if (groupId) {
      getGroup(groupId);
    }
  }, [groupId]);
  // 그룹 내 루트 조회 GET 	/marker-route/group/{groupId} -> selectedRouteData이거 사용해서 GET한 이후 사용
  // 루트 생성할때(날짜 셀렉 모달창) GET	/marker/group/{groupId} 로 그룹내 모든 마커 데이터 받기
  // 그룹 내 루트 생성 POST	/marker-route/group/{groupId} -> Modal쪽 데이터 보기
  // 하나의 루트내 모든 마커 조회 -> 루트의 마커들을 통해서 Polyline볼때
  useEffect(() => {
    //group id로 group에 있는 루트들 조회
    instance
      .get(`/marker-route/group/${groupId}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log('에러발생!', err);
      });
  });
  //routeId들을 갖고 루트내 마커들을 조회해서 Polyline

  const closeModal = () => {
    setModalVisible(false);
  };
  const onDragEnd = result => {
    if (!result.destination) return;
    const newGroupMarkers = Array.from(selectedMarkersData);
    const [reorderedItem] = newGroupMarkers.splice(result.source.index, 1);
    newGroupMarkers.splice(result.destination.index, 0, reorderedItem);

    setSelectedMarkersData(newGroupMarkers);
  };
  useEffect(() => {
    const filteredMarkers = groupMarkers.filter(marker => marker.groupId === curGroupId);
    setGroupMarkerD(filteredMarkers);
  }, [curGroupId]);
  const selectedGroupMarkers = groupMarkers.filter(
    //groupmarkers -> 그룹안에 있는 마커
    marker => marker.groupId === groups[curGroup].groupId,
  );

  const selectGroup = groupId => {
    const selectIndex = groups.findIndex(e => {
      return e.groupId === groupId;
    });
    setCurGroup(selectIndex);
    setCurGroupId(groupId);
    setRouteId(groupId);
    setIsGroups(false);

    const selectedRoute = routeMaker.find(route => route.id === groupId); //routeMaker 루트안에 있는 마커
    setSelectedRouteData(selectedRoute); // 상태 업데이트
  };
  useEffect(() => {
    instance
      .get(`/route/${routeId}`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log('에러발생!', err);
      });
  });

  const openGroup = () => {
    setIsGroups(!isGroups);
  };
  const handleMarkerCreate = () => {
    setActiveButton('marker');
    setModalVisible(!modalVisible);
  };

  const toggleMarkerSelection = markerId => {
    setSelectedMarkers(prevSelectedMarkers =>
      prevSelectedMarkers.includes(markerId)
        ? prevSelectedMarkers.filter(id => id !== markerId)
        : [...prevSelectedMarkers, markerId],
    );
  };
  const handleRouteCreate = () => {
    setActiveButton('route');
    setRouteModalVisible(!routeModalVisible);
  };
  const handleMarkersSelected = selectedMarkerIds => {
    const selectedData = selectedGroupMarkers.filter(marker =>
      selectedMarkerIds.includes(marker.id),
    );
    setSelectedMarkersData(selectedData);
  };
  const handleRouteSubmit = markers => {
    console.log(handleRouteSubmit);
    console.log(markers);
  };

  const handleMarkerClick = marker => {
    setSelectedMarkersData([marker]);
    // onDataFromRouteTap(marker);
  };
  const handleTitleClick = () => {
    onDataFromRouteTap(selectedRouteData);
  };
  return (
    <div className={styles.routeTap}>
      <div className="w-full flex flex-col items-center justify-center">
        <p onClick={openGroup} className={`${styles.routeTapItem} rounded border p-2`}>
          {groups[curGroup].groupTitle}
        </p>
        {isGroups ? (
          <ul className={`${styles.routeTapItem} rounded border`}>
            {groups.map((group, i) => {
              return (
                <li
                  onClick={() => {
                    selectGroup(group.groupId);
                  }}
                  key={i}
                  className="p-2 border border-b"
                >
                  {group.groupTitle}
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
      {selectedRouteData && <h3 onClick={handleTitleClick}>{selectedRouteData.title}</h3>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {selectedMarkersData.map((marker, index) => (
                <Draggable key={marker.id} draggableId={marker.id} index={index}>
                  {provided => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleMarkerClick(marker)}
                    >
                      <Posting
                        title={marker.title}
                        writer={marker.writer}
                        date={marker.date}
                        fav={marker.fav}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className={styles.buttonContainer}>
        <button
          onClick={handleMarkerCreate}
          className={`${styles.routeMarkerButton} ${
            activeButton === 'marker' ? styles.activeButton : ''
          }`}
        >
          마커 등록
        </button>
        <button
          onClick={handleRouteCreate}
          className={`${styles.routeCreateButton} ${
            activeButton === 'route' ? styles.activeButton : ''
          }`}
        >
          루트 생성
        </button>
      </div>
      {modalVisible && (
        <MarkerSelectModal
          onClose={handleMarkerCreate}
          selectedGroupMarkers={selectedGroupMarkers}
          onMarkersSelected={handleMarkersSelected}
        />
      )}
      {routeModalVisible && (
        <RouteModal
          onClose={() => setRouteModalVisible(false)}
          selectedMarkers={selectedMarkersData}
          onSubmit={handleRouteSubmit}
        />
      )}
    </div>
  );
};

export default RouteTap;
