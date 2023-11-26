import React, { useEffect, useRef, useState } from 'react';
import Styles from './RouteModal.module.css';
import { MdCheckBox } from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
const { defaultImg } = {
  defaultImg: 'https://i.pinimg.com/564x/a4/ac/dd/a4acdd0fc741bf7ee7ffaeb3ed87dbee.jpg',
};
const RouteModal = ({ selectedMarkers, onClose, onSubmit }) => {
  const modalRef = useRef();
  const [formData, setFormData] = useState({
    markerIds: [],
    title: '',
    memo: '',
    images: [],
    visible: '',
    wentDate: '',
  });
  const [images, setImages] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      visible: isChecked ? 1 : 0,
    }));
  }, [isChecked]);
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

  useEffect(() => {
    const localDate = new Date();
    const localDateString =
      localDate.toISOString().split('T')[0] + 'T' + localDate.toTimeString().split(' ')[0];

    setFormData(prevFormData => ({
      ...prevFormData,
      markerIds: selectedMarkers.map(marker => marker.id),
      wentDate: localDateString,
    }));
  }, [selectedMarkers]);
  const handleSubmit = e => {
    e.preventDefault();
    const completeFormData = {
      ...formData,
      images,
    };
    onSubmit(selectedMarkers);
    onClose();
  };
  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        setImages(oldImages => [...oldImages, e.target.result]);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div className={Styles.MarkerpostingModal}>
      <div className="modalContainer">
        <button className={Styles.closeButton} onClick={onClose}>
          ×
        </button>
        <div className={Styles.titleBar}>
          <h2>루트 생성</h2>
        </div>
        <input
          type="file"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
          id="image-upload"
        />
        <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }}>
          {images.length === 0 ? (
            <SwiperSlide>
              <label htmlFor="image-upload" className={Styles.uploadButton}>
                <img src={defaultImg} alt="default" />
              </label>
            </SwiperSlide>
          ) : (
            images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Uploaded-${index}`} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
        <form onSubmit={handleSubmit}>
          <label className={Styles.inputLabel}>마커 제목</label>
          <input
            className={Styles.inputField}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label className={Styles.inputLabel}>추가메모</label>
          <textarea
            className={Styles.textAreaField}
            name="memo"
            value={formData.memo}
            onChange={handleChange}
            placeholder="추가 메모"
          />
          <div className={Styles.buttonContainer}>
            <button type="submit" className={Styles.saveButton}>
              생성 완료
            </button>
            <div onClick={handleCheckbox}>
              <MdCheckBox
                onChange={handleCheckbox}
                className={isChecked ? Styles.checkboxActive : ''}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RouteModal;
