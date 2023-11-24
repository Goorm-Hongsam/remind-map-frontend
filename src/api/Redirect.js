import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserLogin } from '../store/UserLogin';
import { UserProfile } from '../store/UserProfile';
import { UserNickname } from '../store/UserNickname';
import { UserId } from '../store/UserId';
import { instance } from './customAxios';

const Redirect = () => {
  const code = new URL(document.location.toString()).searchParams.get('code');
  const navigate = useNavigate('');

  const [isLogined, setIsLogined] = useRecoilState(UserLogin);
  const [userId, setUserId] = useRecoilState(UserId);
  const [userNickname, setUserNickname] = useRecoilState(UserNickname);
  const [userProfile, setUserProfile] = useRecoilState(UserProfile);

  useEffect(() => {
    const existingToken = localStorage.getItem('Authorization');

    if (existingToken) {
      setIsLogined(true);
      navigate('/');
    } else {
      if (code) {
        instance
          .post(`/kakao/kakaoLogin/${code}`)
          .then(response => {
            localStorage.setItem('Authorization', response.headers.authorization);
            setUserId(response.data.memberId);
            setUserNickname(response.data.nickname);
            setUserProfile(response.data.thumbnailImageUrl);
            navigate('/');
            setIsLogined(true);
          })
          .catch(error => console.error);
      }
    }
  }, []);
};

export default Redirect;
