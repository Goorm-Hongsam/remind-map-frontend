import React from 'react';
import Styles from './RoundTap.module.css';

const RoundTap = ({ isMarkerActive, handleActiveRoute }) => {
  return (
    <div className={Styles.roundTap}>
      <button className={`${isMarkerActive ? Styles.active : ''}`} onClick={handleActiveRoute}>
        마커
      </button>
      <button className={`${isMarkerActive ? '' : Styles.active}`} onClick={handleActiveRoute}>
        루트
      </button>
    </div>
  );
};

export default RoundTap;
