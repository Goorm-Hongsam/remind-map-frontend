import React from 'react';
import Styles from './Posting.module.css';

const Posting = ({ place_name, road_address_name, address_name, phone }) => {
  return (
    <div className={Styles.posting}>
      <div className={Styles.postingInfo}>
        <div className={Styles.title}>{place_name}</div>
        <div className={Styles.writer}>{road_address_name || address_name}</div>
        <div className={Styles.date}>{phone}</div>
      </div>
    </div>
  );
};

export default Posting;
