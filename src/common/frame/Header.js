import { useState, useEffect } from 'react';
import Styles from './Header.module.css';
import { AiFillHome } from 'react-icons/ai';
import { HiUserGroup } from 'react-icons/hi2';
import { useRecoilState, useRecoilValue } from 'recoil';
import { UserId } from '../../store/UserId';
import { UserLogin } from '../../store/UserLogin';
import { UserProfile } from '../../store/UserProfile';
import { UserNickname } from '../../store/UserNickname';
import { instance } from '../../api/customAxios';
import { Link } from 'react-router-dom';
import GroupInvites from '../../tap/group/components/ui-components/GroupInvites';
import useFriends from '../../hooks/useFriends';
import { groupInvitesState } from '../../recoil/groupAtoms';
import Bell from '../icon/Bell';
import GroupButton from '../../tap/group/components/atom-components/GroupButton';

const Header = () => {
  const [isLogined, setIsLogined] = useRecoilState(UserLogin);
  const [userId, setUserId] = useRecoilState(UserId);
  const [userNickname, setUserNickname] = useRecoilState(UserNickname);
  const [userProfile, setUserProfile] = useRecoilState(UserProfile);
  const [isInvites, setIsInvites] = useState(false);
  const { getGroupInvite } = useFriends();
  const groupInvites = useRecoilValue(groupInvitesState);
  console.log('header 유저 프로필', userProfile);
  const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  useEffect(() => {
    console.log('나에게 온 초대메시지 불러오기 !');
    getGroupInvite();
    console.log(groupInvites);
  }, [isInvites]);
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&prompt=login&scope=profile_nickname,profile_image,friends,talk_message`;

  const handleLogin = () => {
    window.location.href = link;
  };
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const location = window.location.origin;

  const handleLogout = () => {
    instance
      .post('/out')
      .then(response => {
        if (response.status === 200) {
          localStorage.removeItem('Authorization');
          window.location.href = `${location}`;
        }
      })
      .catch(e => console.error());
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
      <Link to="/" className={Styles.title}>
        📌 RemindMap
      </Link>

      {isLogined && profileImg ? (
        <div className={Styles.userInfo} onClick={toggleDropdown}>
          <img className={Styles.userPhoto} src={profileImg} alt="유저 프로필" />
          <div className={Styles.userName}>{nickname}</div>
          {isDropdownVisible && (
            <div className={Styles.dropdown}>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          )}
          <GroupButton
            text={<Bell />}
            type="Button"
            size="icon"
            onClick={() => {
              setIsInvites(!isInvites);
            }}
          />
        </div>
      ) : (
        <div className="flex">
          <button className={Styles.loginBtn} onClick={handleLogin}>
            로그인
          </button>
          <GroupButton
            text={<Bell />}
            type="Button"
            size="icon"
            onClick={() => {
              setIsInvites(!isInvites);
            }}
          />
        </div>
      )}
      {isInvites && <GroupInvites setIsInvites={setIsInvites} />}
    </header>
  );
};

export default Header;
