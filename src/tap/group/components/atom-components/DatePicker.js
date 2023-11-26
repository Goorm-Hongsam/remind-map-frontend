import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import styles from '../../GroupTap.module.css';
export default function DatePicker() {
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });
  const handleValueChange = newValue => {
    setValue(newValue);
  };

  const datePickerOptions = {
    inputClassName: 'w-full p-2',
    containerClassName: `${styles.groupTapItem} border rounded-sm`,
    toggleClassName: 'hidden',
    primaryColor: 'purple',
    useRange: false,
    value: value,
    onChange: handleValueChange,
    placeholder: 'YYYY-MM-DD',
  };
  return <Datepicker {...datePickerOptions} />;
}
