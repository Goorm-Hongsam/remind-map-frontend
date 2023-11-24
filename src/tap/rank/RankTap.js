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

  /* 배열 변수명 대소문자 주의 */
  useEffect(() => {
    const boardType = isMarkerActive === true ? 'marker' : 'route';
    const value = selectedValue;

    if (value === '실시간 조회수 TOP 10') {
      instance.get(`/rank?boardType=${boardType}&count=10`).then(response => {
        if (response.status === 200) {
          `setUser${boardType}`(response.data);
        }
      });
    }
  }, []);

  const userMarkerArr = [
    {
      id: 1,
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

  const userRouteArr = [];

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
