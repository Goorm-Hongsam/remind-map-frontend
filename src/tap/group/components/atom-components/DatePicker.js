import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

export default function DatePicker({ date, setDate }) {
  const handleDateInput = newValue => {
    setDate(newValue);
  };

  const datePickerOptions = {
    containerClassName: `w-11/12  rounded-sm text-center`,
    inputClassName: 'text-xs p-3 border border-main-color w-full',
    toggleClassName: 'hidden',
    primaryColor: 'purple',
    useRange: false,
    value: date,
    onChange: handleDateInput,
    placeholder: 'YYYY-MM-DD',
  };
  return <Datepicker {...datePickerOptions} />;
}
