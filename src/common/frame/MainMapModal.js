import React, { useState } from 'react';
import Styles from './MainMapModal.module.css';
import { FcCancel } from 'react-icons/fc';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import '../userposting/swiper-bundle.css';

const MainMapModal = ({ data, onClose }) => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  if (!data) return null;
  const modalStyle = {
    position: 'absolute',
    top: `${data.modalTop}px`,
    left: `${data.modalLeft}px`,
    transform: 'translate(-50%, -100%)', // 모달을 마커 위에 정확히 위치시키기 위한 조정
  };
  return (
    <div className={Styles.postingModal} style={modalStyle}>
      <div className={Styles.photo}>
        <div className={Styles.carousel}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={1}
          >
            {data.media.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt="미디어" className={Styles.image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <button className={Styles.likeBtn} onClick={onClose}>
          <FcCancel className={`${Styles.like} ${like ? Styles.activeLike : ''}`} />
        </button>
      </div>
      <div className={Styles.PostingInfo}>
        <div className={Styles.top}>
          <div className={Styles.title}>{data.title}</div>
          <div className={Styles.writer}>by {data.writer}</div>
          <div className={Styles.date}>{data.date}</div>
        </div>
        <div className={Styles.bottom}>
          <div className={Styles.location}>📌 청계천 한화불꽃길</div>
          <div className={Styles.field}>{data.memo}</div>
        </div>
      </div>
    </div>
  );
};

export default MainMapModal;
