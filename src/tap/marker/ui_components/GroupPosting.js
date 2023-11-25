import React from 'react';
import Styles from './Posting.module.css';

const GroupPosting = ({ onPostClick, latitude, longitude, title, writer, date, fav }) => {
  return (
    <div
      className={Styles.posting}
      onClick={() => onPostClick({ latitude, longitude, title, writer, date })}
    >
      <div className={Styles.postingInfo}>
        <div className={Styles.title}>{title}</div>
        <div className={Styles.writer}>{writer}</div>
        <div className={Styles.date}>{date}</div>
      </div>
    </div>
  );
};

export default GroupPosting;
