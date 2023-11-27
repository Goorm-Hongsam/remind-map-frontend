import React, { useEffect, useRef, useState } from 'react';
import Styles from './MarkerModal.module.css';
import Datepicker from 'react-tailwindcss-datepicker';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { MdCheckBox } from 'react-icons/md';
import '../../../common/userposting/swiper-bundle.css';
import { instance } from '../../../api/customAxios';
import { FaUpload } from 'react-icons/fa';
const { defaultImg } = {
  defaultImg: 'https://i.pinimg.com/564x/a4/ac/dd/a4acdd0fc741bf7ee7ffaeb3ed87dbee.jpg',
};

const MarkerModal = ({ groupId, data, onClose, onFormData }) => {
  const modalRef = useRef();

  const isEditMode = data != null;

  console.log('id:', groupId, data); //여기서 Null 남 //4로 고정됨
  const fileInputRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });
  const [formData, setFormData] = useState({
    title: '',
    memo: '',
    location: {},
    visiable: '',
    wentDate: '',
  });
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      visiable: isChecked ? true : false,
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
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      location: {
        ...prevState.location,
        latitude: data.x !== undefined ? data.x : data.position.La,
        longitude: data.y !== undefined ? data.y : data.position.Ma,
      },
      wentDate: selectedDate.startDate,
    }));
  };

  const [images, setImages] = useState([]); // 이미지 미리보기를 위한 상태

  const handleImageUpload = event => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files).map(file => URL.createObjectURL(file));
      setImages(prevImages => prevImages.concat(fileArray));
    }
  };
  useEffect(() => {
    if (isEditMode) {
      setFormData({
        title: data.title,
        memo: data.memo,
        location: data.location,
        visiable: data.visiable,
        wentDate: data.wentDate,
      });
    } else {
      setFormData({
        title: '',
        memo: '',
        location: {},
        visiable: '',
        wentDate: '',
      });
    }
  }, [data, isEditMode]);

  const handleSubmit = e => {
    e.preventDefault();
    const formDataObj = new FormData();

    const jsonRequest = JSON.stringify({
      title: formData.title,
      memo: formData.memo,
      location: formData.location,
      visiable: formData.visiable,
      wentDate: formData.wentDate,
    });

    if (fileInputRef.current && fileInputRef.current.files[0]) {
      formDataObj.append('file', fileInputRef.current.files[0]);
    }
    formDataObj.append('request', new Blob([jsonRequest], { type: 'application/json' }));

    const endpoint = isEditMode ? `/marker/group/${groupId}` : `/marker/update/group/${groupId}`;

    instance
      .post(endpoint, formDataObj, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(response => {
        console.log(response.data);
        onClose();
      })
      .catch(err => {
        console.log(err);
      });
    onClose();
  };

  return (
    <div className={Styles.MarkerpostingModal}>
      <button className={Styles.closeButton} onClick={onClose}>
        ×
      </button>
      <div className={Styles.titleBar}>
        <h2>마커 생성</h2>
      </div>
      <input
        type="file"
        style={{ display: 'none' }}
        id="image-upload"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload} // 파일 선택 시 이미지 미리보기 처리
      />
      <div className={Styles.photo}>
        <div className={Styles.carousel}>
          {images.length === 0 ? (
            <img src={defaultImg} alt="기본 이미지" />
          ) : (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              loop={true}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img src={image} alt={`업로드 이미지 ${index + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <label className={Styles.uploadButton} htmlFor="image-upload">
          사진!
        </label>
      </div>
      <div className={Styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <label className={Styles.inputLabel}>마커 제목</label>
          <input
            className={Styles.inputField}
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="마커 제목"
          />

          <label className={Styles.inputLabel}>날짜</label>
          <Datepicker
            inputClassName="w-full p-2"
            containerClassName={`${Styles.groupTapItem} border rounded-sm`}
            toggleClassName="hidden"
            primaryColor="purple"
            asSingle={true}
            value={selectedDate}
            onChange={handleDateChange}
            placeholder="YYYY-MM-DD"
            useRange={false}
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

export default MarkerModal;

/*
  const handleImageUpload = event => {
    const files = event.target.files;
    for (let i = 0; i < files.length && images.length + i < 10; i++) {
      const file = files[i];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          setImages(oldImages => [...oldImages, e.target.result]);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  */
