import React, { useState } from 'react';
import Styles from './MarkerSelectModalPosting.module.css';
import { AiFillStar } from 'react-icons/ai';

const Posting = ({ title, writer, date, fav, onClick, isSelected }) => {
  const [onFav, setOnFav] = useState(fav);
  const handleFav = () => {
    setOnFav(!onFav);
  };

  return (
    <div className={`${Styles.posting} ${isSelected ? Styles.selected : ''}`} onClick={onClick}>
      <div className={Styles.postingInfo}>
        <div className={Styles.title}>{title}</div>
        <div className={Styles.writer}>{writer}</div>
        <div className={Styles.date}>{date}</div>
      </div>
      <button className={Styles.fav} onClick={handleFav}>
        <AiFillStar className={`${Styles.fav} ${onFav ? Styles.active : ''}`} />
      </button>
    </div>
  );
};

export default Posting;
