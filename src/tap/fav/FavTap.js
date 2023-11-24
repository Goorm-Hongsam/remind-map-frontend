import React, { useEffect, useState } from 'react';
import Styles from './FavTap.module.css';
import RoundTap from '../../common/btn/RoundTap';
import Posting from '../../common/userposting/Posting';
import { instance } from '../../api/customAxios';

const FavTap = () => {
  const [isMarkerActive, setIsActiveMaker] = useState(true);

  const handleActiveRoute = () => {
    setIsActiveMaker(!isMarkerActive);
  };

  const userMarkerArr = [
    {
      id: 1111,
      nickName: '정윤수',
      title: '만석공원',
      memo: '만석공원에 왔다!',
      location: {
        latitude: 127.001443714087,
        longitude: 37.300455081,
      },
      wentDate: '2023-11-02T15:30',
    },
    {
      id: 3423,
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

  const userRouteArr = [
    {
      id: 3423,
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

  /*
  const [userRouteArr, setUserRouteArr] = useState([]);

  useEffect(() => {
    instance.get('/star/markers').then(response => {
      if (response.status === 200) {
        setUserMarkerArr(response.data);
      } else {
        console.log(console.error());
      }
    });

    instance.get('/star/routes').then(response => {
      if (response.status === 200) {
        setUserRouteArr(response.data);
      } else {
        console.log(console.error());
      }
    });
  }, [setUserMarkerArr, setUserRouteArr]);*/

  return (
    <div className={Styles.favTap}>
      <RoundTap isMarkerActive={isMarkerActive} handleActiveRoute={handleActiveRoute} />
      <div className={Styles.searchMarker}>
        {isMarkerActive &&
          userMarkerArr.map(marker => (
            <Posting
              key={marker.id}
              title={marker.title}
              nickName={marker.nickName}
              wentDate={marker.wentDate.slice(0, 10)}
              id={marker.id}
              type="marker"
              fav="❌"
            />
          ))}
        {!isMarkerActive &&
          userRouteArr.map(route => (
            <Posting
              key={route.id}
              title={route.title}
              nickName={route.nickName}
              wentDate={route.wentDate.slice(0, 10)}
              id={route.id}
              type="route"
              fav="❌"
            />
          ))}
      </div>
    </div>
  );
};

export default FavTap;
