import React, { useState } from 'react';
import Styles from './RankSelect.module.css';

const RankSelect = ({ onSelectChange }) => {
  const [selectedOption, setSelectedOption] = useState('실시간 조회수 TOP 10');

  const handleSelectChange = event => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelectChange(selectedValue);
  };

  return (
    <div className={Styles.rankSelectContainer}>
      <select className={Styles.rankSelect} value={selectedOption} onChange={handleSelectChange}>
        <option>실시간 조회수 TOP 10</option>
        {/*<option>최근 최다 좋아요 TOP 10</option>
        <option>최근 최다 찜 TOP 10</option> */}
      </select>
    </div>
  );
};

export default RankSelect;
