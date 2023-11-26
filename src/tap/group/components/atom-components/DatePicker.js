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
    containerClassName: `w-11/12 bg-white z-20`,
    // inputClassName: 'text-sm',
    toggleClassName: 'hidden',
    primaryColor: 'purple',
    useRange: false,
    value: date,
    onChange: handleDateInput,
    placeholder: 'YYYY-MM-DD~YYYY-MM-DD',
  };
  return (
    <div className="z-20">
      <Datepicker {...datePickerOptions} />
    </div>
  );
}
