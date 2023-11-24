import { useState, useEffect } from 'react';
import Styles from './Header.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserId } from '../../store/UserId';
import { UserLogin } from '../../store/UserLogin';
import { UserProfile } from '../../store/UserProfile';
import { UserNickname } from '../../store/UserNickname';
import { instance } from '../../api/customAxios';

const Header = () => {
  const [isLogined, setIsLogined] = useRecoilState(UserLogin);
  const [userId, setUserId] = useRecoilState(UserId);
  const [userNickname, setUserNickname] = useRecoilState(UserNickname);
  const [userProfile, setUserProfile] = useRecoilState(UserProfile);

  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login&scope=profile_nickname,profile_image,friends,talk_message`;

  const handleLogin = () => {
    window.location.href = link;
  };

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    /*instance
      .post('/logout')
      .then(response => console.log(response))
      .catch(e => console.error());*/
    setIsLogined(false);
  };

  const profileImg = useRecoilValue(UserProfile);
  const nickname = useRecoilValue(UserNickname);

  useEffect(() => {
    instance
      .post('/login-check')
      .then(response => {
        console.log(response);
        setUserId(response.data.memberId);
        setUserNickname(response.data.nickname);
        setUserProfile(response.data.thumbnailImageUrl);
        setIsLogined(true);
      })
      .catch(e => {
        console.log('토큰이 유효하지 않습니다.');
      });
  }, [setIsLogined, setUserId, setUserNickname, setUserProfile]);

  return (
    <header className={Styles.header}>
      <div className={Styles.title}>📌 RemindMap</div>
      {isLogined && profileImg ? (
        <div className={Styles.userInfo} onClick={toggleDropdown}>
          <img className={Styles.userPhoto} src={profileImg} alt="유저 프로필" />
          <div className={Styles.userName}>{nickname}</div>
          {isDropdownVisible && (
            <div className={Styles.dropdown}>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          )}
        </div>
      ) : (
        <button className={Styles.loginBtn} onClick={handleLogin}>
          로그인
        </button>
      )}
    </header>
  );
};

export default Header;
