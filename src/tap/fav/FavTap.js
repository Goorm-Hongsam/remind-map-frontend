import React, { useEffect, useState } from 'react';
import Styles from './FavTap.module.css';
import axios from 'axios';
import RoundTap from '../../common/btn/RoundTap';
import Posting from '../../common/userposting/Posting';

const FavTap = () => {
  const [isMakerActive, setIsActiveMaker] = useState(true);
  const [userMarkerArr, setUserMarkerArr] = useState([]);

  const handleActiveRoute = () => {
    setIsActiveMaker(!isMakerActive);
  };

  useEffect(() => {
    axios
      .get('https://localhost:8080/star/markers', {
        headers: {
          Authorization: 'jwt',
        },
      })
      .then(response => {
        setUserMarkerArr(response.data);
      })
      .catch(console.log('아직 없음'));
  }, []);

  const userRouteArr = [
    {
      id: 2,
      nickName: '황윤',
      title: '수원역',
      memo: '수원역에 왔다!',
      location: {
        latitude: 127.001443714087,
        longitude: 37.300455081,
      },
      wentDate: '2023-11-02T15:30',
    },
  ];

  return (
    <div className={Styles.favTap}>
      <RoundTap isMakerActive={isMakerActive} handleActiveRoute={handleActiveRoute} />
      <div className={Styles.searchMarker}>
        {isMakerActive &&
          userMarkerArr.map((marker, index) => (
            <Posting
              key={index}
              title={marker.title}
              nickName={marker.nickName}
              wentDate={marker.wentDate.slice(0, 10)}
            />
          ))}
        {!isMakerActive &&
          userRouteArr.map((route, index) => (
            <Posting
              key={index}
              title={route.title}
              nickName={route.nickName}
              wentDate={route.wentDate.slice(0, 10)}
            />
          ))}
      </div>
    </div>
  );
};

export default FavTap;
