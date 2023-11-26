import React from 'react';
import Styles from './Posting.module.css';
import { instance } from '../../api/customAxios';

const Posting = ({ id, title, nickName, wentDate, latitude, longitude, fav, type }) => {
  const handleFavorite = () => {
    const endpoint = type === 'marker' ? `/star/markers/${id}` : `/star/routes/${id}`;
    const method = fav === '❌' ? 'delete' : 'post';

    instance[method](endpoint)
      .then(response => {
        if (response.status === (fav === '❌' ? 204 : 201)) {
          alert(
            `${type === 'marker' ? '마커' : '루트'} 찜이 ${
              fav === '❌' ? '삭제되었어요.' : '완료되었어요.'
            }`,
          );
        } else {
          console.log(
            `${type === 'marker' ? '마커' : '루트'} 찜 ${fav === '❌' ? '삭제' : '실패'}`,
          );
        }
      })
      .catch(error => {
        alert('잘못된 접근이에요.');
      });
  };

  return (
    <div className={Styles.posting}>
      <div className={Styles.postingInfo}>
        <div className={Styles.title}>{title}</div>
        <div className={Styles.nickName}>{nickName}</div>
        <div className={Styles.wentDate}>{wentDate}</div>
        <div className={Styles.latitude}>{latitude}</div>
        <div className={Styles.longitude}>{longitude}</div>
      </div>
      {fav ? (
        <button className={Styles.fav} onClick={handleFavorite}>
          {fav}
        </button>
      ) : null}
    </div>
  );
};

export default Posting;
