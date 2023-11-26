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

  const [userMarkerArr, setUserMarkerArr] = useState([]);
  const [userRouteArr, setUserRouteArr] = useState([]);

  useEffect(() => {
    if (isMarkerActive) {
      instance.get('/star/markers').then(response => {
        if (response.status === 200) {
          console.log(response);
          setUserMarkerArr(response.data);
        } else {
          console.log(console.error());
        }
      });
    } else {
      instance.get('/star/routes').then(response => {
        if (response.status === 200) {
          console.log(response);
          setUserRouteArr(response.data);
        } else {
          console.log(console.error());
        }
      });
    }
  }, [isMarkerActive]);

  return (
    <div className={Styles.favTap}>
      <RoundTap isMarkerActive={isMarkerActive} handleActiveRoute={handleActiveRoute} />
      <div className={Styles.searchMarker}>
        {isMarkerActive &&
          (userMarkerArr.length > 0 ? (
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
            ))
          ) : (
            <div>찜이 없어요.</div>
          ))}
        {!isMarkerActive &&
          (userRouteArr.length > 0 ? (
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
            ))
          ) : (
            <div>찜이 없어요.</div>
          ))}
      </div>
    </div>
  );
};

export default FavTap;
