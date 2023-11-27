import React from 'react';
import Styles from './Posting.module.css';

const GroupPosting = ({
  wentDate,
  onPostClick,
  latitude,
  longitude,
  title,
  writer,
  nickName,
  date,
  fav,
}) => {
  return (
    <div
      className={Styles.posting}
      onClick={() => onPostClick({ latitude, longitude, title, writer, wentDate, nickName })}
    >
      <div className={Styles.postingInfo}>
        <div className={Styles.title}>{title}</div>
        <div className={Styles.writer}>{writer}</div>
        <div className={Styles.wentDate}>{wentDate}</div>
        <div className={Styles.nickName}>{nickName}</div>
      </div>
    </div>
  );
};

export default GroupPosting;
