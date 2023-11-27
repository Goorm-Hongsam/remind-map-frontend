import React, { useState } from 'react';
import Styles from './PostingModal.module.css';
import { GoHeartFill } from 'react-icons/go';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './swiper-bundle.css';

const PostingModal = ({ marker }) => {
  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  const userClickMarker = [
    {
      title: '청계천에서 본 하늘',
      writer: '청계',
      date: '2023-10-1',
      fav: true,
      latitude: 0,
      longitued: 1,
      field:
        'Me and my girlies We gon party til its early Got me feeling otherworldly tonight Caught in some traffic But the radio is blasting Drop a red light and well sing it goodbye',
      media: [
        'https://i.pinimg.com/564x/a4/ac/dd/a4acdd0fc741bf7ee7ffaeb3ed87dbee.jpg',
        'https://i.pinimg.com/736x/17/f6/3e/17f63ecacff59cfd166f40b49b9bfd8c.jpg',
        'https://i.pinimg.com/564x/f6/9b/db/f69bdbd6be8b9046b0fb5ddec940774c.jpg',
        'https://i.pinimg.com/564x/16/52/29/165229856341ce4a30edcb4e60dc0105.jpg',
      ],
    },
  ];

  return (
    <div className={Styles.postingModal}>
      <div className={Styles.photo}>
        <div className={Styles.carousel}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            slidesPerView={1}
          >
            {userClickMarker[0].media.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt="미디어" className={Styles.image} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <button className={Styles.likeBtn} onClick={handleLike}>
          <GoHeartFill className={`${Styles.like} ${like ? Styles.activeLike : ''}`} />
        </button>
      </div>
      <div className={Styles.PostingInfo}>
        <div className={Styles.top}>
          <div className={Styles.title}>{userClickMarker[0].title}</div>
          <div className={Styles.writer}>by {userClickMarker[0].writer}</div>
          <div className={Styles.date}>{userClickMarker[0].date}</div>
        </div>
        <div className={Styles.bottom}>
          <div className={Styles.location}>📌 청계천 한화불꽃길</div>
          <div className={Styles.field}>{userClickMarker[0].field}</div>
        </div>
      </div>
    </div>
  );
};

export default PostingModal;
