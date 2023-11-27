import React, { useEffect, useState } from 'react';
import Styles from './RankTap.module.css';
import RankSelect from '../../common/select/RankSelect';
import RoundTap from '../../common/btn/RoundTap';
import Posting from '../../common/userposting/Posting';
import { instance } from '../../api/customAxios';

const RankTap = () => {
  const [isMarkerActive, setIsActiveMaker] = useState(true);
  const [selectedValue, setSelectedValue] = useState('실시간 조회수 TOP 10');

  const handleActiveRoute = () => {
    setIsActiveMaker(!isMarkerActive);
  };

  const handleSelectChange = value => {
    setSelectedValue(value);
  };

  const [userMarkerArr, setUserMarkerArr] = useState([]);
  const [userRouteArr, setUserRouteArr] = useState([]);

  useEffect(() => {
    const value = selectedValue;
    if (value === '실시간 조회수 TOP 10') {
      if (isMarkerActive) {
        instance.get('/rank-marker?count=10').then(response => {
          if (response.data.length !== 0) {
            setUserMarkerArr(response.data);
            console.log(response.data);
          } else if (response.data.length === 0) {
            alert('데이터가 없습니다.');
          }
        });
      } else {
        instance.get('/rank-route?count=10').then(response => {
          if (response.data.length !== 0) {
            setUserRouteArr(response.data);
          } else if (response.data.length === 0) {
            alert('데이터가 없습니다.');
          }
        });
      }
    }
  }, [isMarkerActive, selectedValue]);

  return (
    <div className={Styles.rankTap}>
      <RankSelect onSelectChange={handleSelectChange} />
      <RoundTap isMarkerActive={isMarkerActive} handleActiveRoute={handleActiveRoute} />
      {isMarkerActive &&
        userMarkerArr.map(marker => (
          <Posting
            key={marker.id}
            title={marker.title}
            nickName={marker.nickName}
            wentDate={marker.wentDate.slice(0, 10)}
            id={marker.id}
            type="marker"
            fav="찜"
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
            fav="찜"
          />
        ))}
    </div>
  );
};

export default RankTap;
