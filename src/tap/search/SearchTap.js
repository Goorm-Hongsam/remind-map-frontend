import React, { useState, useEffect } from 'react';
import Styles from './SearchTap.module.css';
import SearchInput from '../../common/input/SearchInput';
import RoundTap from '../../common/btn/RoundTap';
import Posting from '../../common/userposting/Posting';
import { instance } from '../../api/customAxios';

const SearchTap = ({ onSearchResults }) => {
  const [isMarkerActive, setIsActiveMaker] = useState(true);
  const [place, setPlace] = useState('');
  const [savedSearchResults, setSavedSearchResults] = useState([]);
  const [clickedLocation, setClickedLocation] = useState(null);

  const handleActiveRoute = () => {
    setIsActiveMaker(!isMarkerActive);
  };

  /* 연결되면 이거 useState로 바꿔야 함 */
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
      id: 718,
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

  const [isclick, setIsClick] = useState(false);

  const searchPlaces = async () => {
    if (!place.trim()) {
      alert('검색어를 입력해주세요');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(place, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        onSearchResults(data);
        setSavedSearchResults(data);
      }
    });
  };

  const [display, setDisplay] = useState(true);

  const handleInputChange = e => {
    setPlace(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    searchPlaces();
    setDisplay(true);
  };

  const click = (x, y) => {
    setClickedLocation({ x, y });
    setPlace('');
    setIsClick(true);
    setDisplay(false);
  };

  useEffect(() => {
    if (clickedLocation) {
      const { x, y } = clickedLocation;
      if (isMarkerActive) {
        instance
          .get(`/markers?latitude=${x}&longitude=${y}`)
          .then(response => {
            if (response.data !== null) {
              userMarkerArr(response.data);
            } else {
              alert('데이터가 없습니다.');
            }
          })
          .catch(console.error);
      } else {
        instance
          .get(`/marker-route?latitude=${x}&longitude=${y}`)
          .then(response => {
            if (response.data !== null) {
              userRouteArr(response.data);
            } else {
              alert('데이터가 없습니다.');
            }
          })
          .catch(console.error);
      }
    }
  }, [isMarkerActive, clickedLocation]);

  const handleSearchReset = () => {
    setSavedSearchResults([]);
    setIsClick(false);
    setDisplay(true);
  };

  return (
    <div className={Styles.searchTap}>
      <div className={Styles.SearchInputContainer}>
        <form onSubmit={handleSubmit}>
          <SearchInput
            value={place}
            onChange={handleInputChange}
            placeholder="장소를 입력하세요"
            className={Styles.searchInput}
          />
        </form>
        <button className={Styles.searchReset} onClick={handleSearchReset}>
          리셋
        </button>
      </div>
      <div className={Styles.searchMarker}>
        {!isclick &&
          display &&
          savedSearchResults.map((result, index) => (
            <li onClick={() => click(result.x, result.y)} key={index}>
              <div>{result.place_name}</div>
              <p>{result.road_address_name || result.address_name}</p>
            </li>
          ))}
        {isclick && isMarkerActive && !display && (
          <div className={Styles.posting}>
            <RoundTap isMarkerActive={isMarkerActive} handleActiveRoute={handleActiveRoute} />
            {isMarkerActive &&
              userMarkerArr.map(marker => (
                <Posting
                  key={marker.id}
                  title={marker.title}
                  nickName={marker.nickName}
                  wentDate={marker.wentDate.slice(0, 10)}
                  id={marker.id}
                  fav="찜"
                  type="marker"
                />
              ))}
          </div>
        )}
        {isclick && !isMarkerActive && !display && (
          <div className={Styles.posting}>
            <RoundTap isMarkerActive={isMarkerActive} handleActiveRoute={handleActiveRoute} />
            {!isMarkerActive &&
              userRouteArr.map((route, index) => (
                <Posting
                  key={index}
                  title={route.title}
                  nickName={route.nickName}
                  wentDate={route.wentDate.slice(0, 10)}
                  id={route.id}
                  fav="찜"
                  type="route"
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchTap;
