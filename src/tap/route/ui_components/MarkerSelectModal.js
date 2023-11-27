import React, { useEffect, useRef, useState } from 'react';
import Styles from './MarkerSelectModal.module.css';
import Datepicker from 'react-tailwindcss-datepicker';
import MarkerSelectModalPosting from './Modal/MarkerSelectModalPosting';

const MarkerSelectModal = ({ onClose, selectedGroupMarkers, onMarkersSelected }) => {
  const modalRef = useRef();
  const [filterMarker, setFilterMarker] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });
  const isDateInRange = (date, startDate, endDate) => {
    const markerDate = new Date(date);
    return markerDate >= startDate && markerDate <= endDate;
  };
  useEffect(() => {
    if (selectedDate.startDate && selectedDate.endDate) {
      const filtered = selectedGroupMarkers.filter(marker =>
        isDateInRange(
          marker.date,
          new Date(selectedDate.startDate),
          new Date(selectedDate.endDate),
        ),
      );
      setFilterMarker(filtered);
    }
  }, [selectedDate, selectedGroupMarkers]);
  const handleMarkerClick = markerId => {
    setSelectedMarker(prevSelected => {
      if (prevSelected.includes(markerId)) {
        return prevSelected.filter(id => id !== markerId);
      } else {
        return [...prevSelected, markerId];
      }
    });
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const handleComplete = () => {
    onMarkersSelected(selectedMarker);
    onClose();
  };
  const handleDateChange = date => {
    setSelectedDate(date);
  };
  useEffect(() => {
    const handleClickOutside = event => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  return (
    <div className={Styles.MarkerpostingModal}>
      <div className="modalContainer">
        <button className={Styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={Styles.titleBar}>
          <h2>마커 선택</h2>
        </div>
        <label className={Styles.inputLabel}>날짜</label>
        <Datepicker
          inputClassName="w-full p-2"
          containerClassName={`${Styles.groupTapItem} border rounded-sm`}
          toggleClassName="hidden"
          primaryColor="purple"
          value={selectedDate}
          onChange={handleDateChange}
          placeholder="YYYY-MM-DD"
          useRange={false}
        />
        <div>
          {filterMarker.map(marker => (
            <MarkerSelectModalPosting
              key={marker.id}
              title={marker.title}
              writer={marker.writer}
              date={marker.date}
              fav={marker.fav}
              onClick={() => handleMarkerClick(marker.id)}
              isSelected={selectedMarker.includes(marker.id)}
            />
          ))}
        </div>
        <button onClick={handleComplete}>등록완료</button>
      </div>
    </div>
  );
};

export default MarkerSelectModal;
