import React from 'react';
import Styles from './SearchInput.module.css';

const SearchInput = ({ value, onChange }) => {
  return (
    <div className={Styles.SearchInputContainer}>
      <input
        className={Styles.searchInput}
        placeholder="장소를 입력하세요."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
