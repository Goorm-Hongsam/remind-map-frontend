import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import styles from '../../GroupTap.module.css';
export default function DatePicker() {
  const [date, setDate] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const handleDateInput = newValue => {
    setDate(newValue);
    console.log('선택한날짜 : ', date);
  };

  const datePickerOptions = {
    // containerClassName: `w-full text-xs `,
    inputClassName: 'w-full bg-white p-3 cursor-pointer border border-main-color rounded-md',
    toggleClassName: 'hidden',
    primaryColor: 'purple',
    useRange: false,
    value: date,
    onChange: handleDateInput,
    placeholder: 'YYYY-MM-DD',
  };
  return (
    <div className={`${styles.groupTapItem} text-xs relative z-10 w-full`}>
      <Datepicker {...datePickerOptions} />
    </div>
  );
}
