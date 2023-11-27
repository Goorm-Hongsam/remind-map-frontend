import React, { useEffect, useState } from 'react';
import Redirect from '../../api/Redirect';
import MainMapModal from './MainMapModal';
import { useRecoilState, useRecoilValue } from 'recoil';
import { groupMarkersState } from '../../recoil/groupAtoms';
import Posting from '../userposting/Posting';
import PostingModal from '../userposting/PostingModal';

const { kakao } = window;

const MainMap = ({
  sidebarData,
  selectedLocation,
  searchResults,
  onMarkerSelect,
  enableMarkerCreation,
  setEnableMarkerCreation,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [polylines, setPolylines] = useState([]);
  const [map, setMap] = useState(null);
  const [groupMarkers, setGroupMarkers] = useRecoilState(groupMarkersState);

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 7,
    };
    const createdMap = new window.kakao.maps.Map(mapContainer, mapOption);
    setMap(createdMap);
  }, []);

  useEffect(() => {
    if (searchResults && searchResults.length > 0 && map) {
      const mapCenter = searchResults[0];
      const centerPosition = new kakao.maps.LatLng(mapCenter.y, mapCenter.x);
      map.setCenter(centerPosition);

      searchResults.forEach(place => {
        const position = new kakao.maps.LatLng(place.y, place.x);
        const marker = new kakao.maps.Marker({
          position,
          map,
        });

        kakao.maps.event.addListener(marker, 'click', () => {
          onMarkerSelect(place);
        });
      });
    }
  }, [searchResults, map]);
  //groupMarkers
  useEffect(() => {
    function hideMarkers() {
      setMarkers(null);
    }
    if (groupMarkers && groupMarkers.length > 0 && map) {
      hideMarkers();
      setGroupMarkers([]);
      for (const groupMarker of groupMarkers) {
        // let overlay = new kakao.maps.CustomOverlay({
        //   content: <PostingModal marker={groupMarker} />,
        //   map: map,
        //   position: new kakao.maps.LatLng(
        //     groupMarker.location.longitude,
        //     groupMarker.location.latitude,
        //   ),
        // });
        let marker = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(
            groupMarker.location.longitude,
            groupMarker.location.latitude,
          ),
          title: groupMarker.title,
        });
        kakao.maps.event.addListener(marker, 'click', () => {
          console.log('그룹마커들입니다 ! ', groupMarker);
        });
        // function closeOverlay() {
        //   overlay.setMap(null);
        // }
      }
      // const groupMarker = groupMarkers[0];
      // console.log('첫번째 그룹 마커입니다 : ', groupMarker);
      // let markerPosition = new kakao.maps.LatLng(
      //   groupMarker.location.longitude,
      //   groupMarker.location.latitude,
      // );

      // let marker = new kakao.maps.Marker({
      //   position: markerPosition,
      // });
      // marker.setMap(map);
    }
  }, [groupMarkers, map]);

  //Marker관련 포스팅 클릭시 마커 생성 부분
  useEffect(() => {
    if (selectedLocation && map) {
      const position = new kakao.maps.LatLng(selectedLocation.longitude, selectedLocation.latitude);
      map.setCenter(position);
      var mapProjection = map.getProjection();
      const marker = new kakao.maps.Marker({
        position,
        map,
      });
      kakao.maps.event.addListener(marker, 'click', () => {
        setModalData({
          ...selectedLocation,
          modalTop: mapProjection.containerPointFromCoords(position).y,
          modalLeft: mapProjection.containerPointFromCoords(position).x,
        });
        setShowModal(true);
      });
    }
  }, [selectedLocation, map]);
  // 마커를 지도 클릭으로 생성하기위해서
  useEffect(() => {
    if (enableMarkerCreation && map) {
      const handleClick = function (mouseEvent) {
        const clickedPosition = mouseEvent.latLng;
        const marker = new kakao.maps.Marker({
          position: clickedPosition,
          map: map,
        });
        onMarkerSelect({
          position: clickedPosition,
          map: map,
        });
        setEnableMarkerCreation(false);
      };
      kakao.maps.event.addListener(map, 'click', handleClick);
      return () => {
        kakao.maps.event.removeListener(map, 'click', handleClick);
      };
    }
  }, [map, enableMarkerCreation, onMarkerSelect]);

  //루트관련 포스팅 클릭시
  useEffect(() => {
    if (sidebarData && sidebarData.markers && map) {
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);

      polylines.forEach(polyline => polyline.setMap(null));
      setPolylines([]);

      const linePath = [];
      const newMarkers = [];
      const newPolylines = [];

      sidebarData.markers.forEach(markerData => {
        const position = new kakao.maps.LatLng(
          markerData.location.latitude,
          markerData.location.longitude,
        );
        linePath.push(position);
        const marker = new kakao.maps.Marker({
          position,
          map,
        });
        newMarkers.push(marker);
        kakao.maps.event.addListener(marker, 'click', () => {
          setModalData(markerData);
          setShowModal(true);
        });
      });
      if (linePath.length > 1) {
        const polyline = new kakao.maps.Polyline({
          path: linePath,
          strokeWeight: 5,
          strokeColor: '#FFAE00',
          strokeOpacity: 0.7,
          strokeStyle: 'solid',
        });

        polyline.setMap(map);
        newPolylines.push(polyline);
      }
      setMarkers(newMarkers);
      setPolylines(newPolylines);
      if (sidebarData.markers.length > 0) {
        const firstMarkerPosition = new kakao.maps.LatLng(
          sidebarData.markers[0].location.latitude,
          sidebarData.markers[0].location.longitude,
        );
        map.setCenter(firstMarkerPosition);
      }
    }
  }, [sidebarData, map]);

  return (
    <div style={{ display: 'flex' }}>
      <div
        id="map"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
        }}
      />
      <Redirect />
      {showModal && <MainMapModal data={modalData} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MainMap;
