import React, { useEffect, useState } from 'react';
import Redirect from '../../api/Redirect';

const { kakao } = window;

const MainMap = ({ searchResults }) => {
  const [map, setMap] = useState(null);
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
      const centerPosition = new window.kakao.maps.LatLng(mapCenter.y, mapCenter.x);
      map.setCenter(centerPosition);
      /*
      searchResults.forEach(place => {
        const position = new window.kakao.maps.LatLng(place.y, place.x);
        const marker = new window.kakao.maps.Marker({
          position,
          map,
        });
      });*/
    }
  }, [searchResults, map]);

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
    </div>
  );
};

export default MainMap;
