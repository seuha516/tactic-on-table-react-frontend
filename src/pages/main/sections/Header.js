import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { getLength } from 'lib/utils/getLength';
import { getAnonymous } from 'lib/utils/getRandom';
import { logout } from 'modules/users';
import { changeField as changeChatField } from 'modules/chats';

const CATEGORY_ITEMS = [
  {
    value: 'Games',
    to: '/games',
  },
  {
    value: 'Match record',
    to: '/match_record',
  },
  {
    value: 'Ranking',
    to: '/ranking',
  },
];

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(store => store.users.user);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [profilePopUpOpen, setProfilePopUpOpen] = useState(false);
  const sideBarRef = useRef(null);
  const sideBarButtonRef = useRef(null);
  const profilePopUpRef = useRef(null);
  const profilePopUpButtonRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSideBarOpen(false);
    setProfilePopUpOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(e.target) &&
        sideBarButtonRef.current &&
        !sideBarButtonRef.current.contains(e.target)
      ) {
        setSideBarOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        profilePopUpRef.current &&
        !profilePopUpRef.current.contains(e.target) &&
        profilePopUpButtonRef.current &&
        !profilePopUpButtonRef.current.contains(e.target)
      ) {
        setProfilePopUpOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  useEffect(() => {
    const sidebarRemover = () => {
      if (window.innerWidth > 640) setSideBarOpen(false);
    };
    window.addEventListener('resize', sidebarRemover);
    return () => {
      window.removeEventListener('resize', sidebarRemover);
    };
  }, []);

  const onLogout = () => {
    if (window.confirm('정말 로그아웃하시겠습니까?')) {
      dispatch(logout());
      dispatch(changeChatField({ key: 'me', value: getAnonymous() }));
      navigate('/');
    }
  };

  return (
    <>
      <Wrapper>
        <Title>
          <SidebarButton
            ref={sideBarButtonRef}
            src={require('assets/images/home/header/navbar_icon.png')}
            alt="sidebarButton"
            onClick={() => setSideBarOpen(!sideBarOpen)}
          />
          <TitleTextWrapper to="/">
            <Icon src={require('assets/images/home/header/tot_white_icon.png')} alt="Icon" />
            <TitleText>Tactic On Table</TitleText>
          </TitleTextWrapper>
        </Title>

        <Category>
          {CATEGORY_ITEMS.map(item => (
            <Link to={item.to} key={item.value}>
              <CategoryItem>{item.value}</CategoryItem>
            </Link>
          ))}
        </Category>

        {user ? (
          <ProfileWrapper
            ref={profilePopUpButtonRef}
            onClick={() => setProfilePopUpOpen(!profilePopUpOpen)}
          >
            <ProfileImageWrapper>
              <ProfileImage src={process.env.REACT_APP_API_IMAGE + user.image} alt="profile" />
              {profilePopUpOpen && (
                <ProfilePopUpWrapper ref={profilePopUpRef}>
                  <ProfilePopUpLink to={`user/${user.username}`}>Mypage</ProfilePopUpLink>
                  <ProfilePopUpButton onClick={onLogout}>Logout</ProfilePopUpButton>
                </ProfilePopUpWrapper>
              )}
            </ProfileImageWrapper>
            <ProfileName length={getLength(user.nickname, '18px', 'Noto Sans KR')}>
              {user.nickname}
            </ProfileName>
          </ProfileWrapper>
        ) : (
          <Buttons>
            <Link to="/signup">
              <SignupButton>Sign Up</SignupButton>
            </Link>
            <Link to="/login">
              <LoginButton>Log In</LoginButton>
            </Link>
          </Buttons>
        )}
      </Wrapper>
      <FakeHeader />

      <SidebarWrapper open={sideBarOpen} ref={sideBarRef}>
        <UserInfo user={user}>
          {user ? (
            <>
              <img src={process.env.REACT_APP_API_IMAGE + user.image} alt="profile" />
              <div>{user.nickname}</div>
              <SideBarLink to={`user/${user.username}`}>Mypage</SideBarLink>
              <SideBarButton onClick={onLogout}>Logout</SideBarButton>
            </>
          ) : (
            <>
              <Link to="/signup">
                <SignupButton>Sign Up</SignupButton>
              </Link>
              <Link to="/login">
                <LoginButton>Log In</LoginButton>
              </Link>
            </>
          )}
        </UserInfo>
        <SidebarCategory>
          <Link to="/games">Game</Link>
          <Link to="/match_record">Match Record</Link>
          <Link to="/ranking">Ranking</Link>
        </SidebarCategory>
      </SidebarWrapper>
    </>
  );
};
export default Header;

const Wrapper = styled.div`
  position: fixed;
  z-index: 50;
  width: 100%;
  height: 70px;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 3px solid rgb(68, 68, 68);
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const FakeHeader = styled.div`
  width: 100%;
  height: 70px;
  min-height: 70px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  margin-right: 0px;
`;
const TitleTextWrapper = styled(Link)`
  margin: 0 20px;
`;
const SidebarButton = styled.img`
  width: 40px;
  height: 60px;
  margin-left: 15px;
  display: none;
  cursor: pointer;
  @media all and (max-width: 640px) {
    display: block;
  }
`;
const Icon = styled.img`
  display: none;
  width: 60px;
  height: 60px;
  @media all and (max-width: 1100px) {
    display: block;
  }
  @media all and (max-width: 640px) {
    display: none;
  }
  @media all and (max-width: 360px) {
    display: block;
  }
`;
const TitleText = styled.div`
  font-family: 'Righteous', cursive;
  font-size: 2.5vw;
  color: white;
  @media all and (max-width: 1100px) {
    display: none;
  }
  @media all and (max-width: 640px) {
    display: block;
    font-size: 32px;
  }
  @media all and (max-width: 360px) {
    display: none;
  }
`;
const Category = styled.div`
  width: 500px;
  margin: 0 15px;
  display: flex;
  justify-content: space-between;
  @media all and (max-width: 1400px) {
    width: 450px;
  }
  @media all and (max-width: 1200px) {
    width: 400px;
  }
  @media all and (max-width: 1100px) {
    width: 450px;
  }
  @media all and (max-width: 970px) {
    width: 400px;
  }
  @media all and (max-width: 900px) {
    width: 350px;
  }
  @media all and (max-width: 830px) {
    width: 320px;
  }
  @media all and (max-width: 730px) {
    width: 280px;
  }
  @media all and (max-width: 640px) {
    display: none;
  }
`;
const CategoryItem = styled.div`
  color: white;
  padding-top: 10px;
  font-size: 18px;
  font-family: 'Noto Sans JP', sans-serif;
  &:hover,
  &:active {
    font-weight: 600;
  }
  &:after {
    backface-visibility: hidden;
    border: 1px solid rgba(255, 255, 255, 0);
    bottom: 0px;
    content: ' ';
    display: block;
    margin: 5px auto;
    position: relative;
    transition: all 0.3s ease-in-out;
    width: 0;
  }
  &:hover:after {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-color: #fff;
    transition: width 350ms ease-in-out;
    width: 100%;
  }
`;
const Buttons = styled.div`
  width: 200px;
  margin: 0 12px;
  text-align: center;
  div {
    margin: 0px 8px;
    width: 80px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding-top: 11px;
    font-weight: 500;
    font-family: 'Source Sans Pro', sans-serif;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    border: none;
    z-index: 1;
    &:hover {
      color: black;
    }
    &:after {
      position: absolute;
      content: '';
      width: 0;
      height: 100%;
      top: 0;
      right: 0;
      z-index: -1;
      border-radius: 5px;
      transition: all 0.5s ease;
    }
    &:hover:after {
      left: 0;
      width: 99%;
    }
    &:active {
      top: 2px;
    }
  }
  @media all and (max-width: 560px) {
    display: none;
  }
`;
const SignupButton = styled.div`
  background-color: #44616b;
  &:after {
    background-color: #82bbcf;
  }
`;
const LoginButton = styled.div`
  background-color: #565c36;
  &:after {
    background-color: #a8b36c;
  }
`;
const ProfileWrapper = styled.div`
  width: 200px;
  min-width: 200px;
  height: 45px;
  margin: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  @media all and (max-width: 560px) {
    display: none;
  }
`;
const ProfileImageWrapper = styled.div`
  position: relative;
  height: 45px;
`;
const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 15px;
  background-color: #ffffff;
`;
const ProfileName = styled.div`
  margin: -1.5px 6.5px 0 13.5px;
  color: white;
  font-size: ${props => (props.length > 135 ? '16px' : '18px')};
  font-family: 'Noto Sans KR', sans-serif;
`;
const ProfilePopUpWrapper = styled.div`
  position: absolute;
  width: 130px;
  height: 100px;
  top: 57.5px;
  left: 22.5px;
  background-color: #c1c1c1;
  border-radius: 5px;
  z-index: 51;
  padding: 10px;
  box-shadow: 1px 1px 1px 1px black;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 20px;
  text-align: center;
  color: white;
  cursor: default;
  &:after {
    border-top: 0px solid transparent;
    border-left: 0px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #c1c1c1;
    content: '';
    position: absolute;
    top: -10px;
    left: 0px;
  }
`;
const ProfilePopUpLink = styled(Link)`
  width: 100%;
  height: 36px;
  background-color: #0c3356;
  padding-top: 6px;
  border-radius: 5px;
  transition: background-color 0.2s linear;
  &:hover {
    background-color: #004b8d;
  }
`;
const ProfilePopUpButton = styled.div`
  width: 100%;
  height: 36px;
  background-color: #830b0b;
  padding-top: 6px;
  border-radius: 5px;
  transition: background-color 0.2s linear;
  cursor: pointer;
  &:hover {
    background-color: #a91717;
  }
`;
const SidebarWrapper = styled.div`
  position: fixed;
  transition: all 0.2s linear;
  width: 300px;
  max-width: 300px;
  height: calc(100% - 70px);
  top: 70px;
  z-index: 50;
  color: white;
  background-color: #000000f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-left: ${props => (props.open ? '0px' : '-300px')};
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const UserInfo = styled.div`
  width: 270px;
  border-radius: 10px;
  margin: 36px 0 60px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ${props =>
    props.user
      ? css`
          padding-top: 20px;
          height: 233px;
          background-color: #ffffff23;
          font-size: 18px;
          font-family: 'Noto Sans KR', sans-serif;
          text-align: center;
          img {
            width: 66px;
            height: 66px;
            border-radius: 5px;
            margin-bottom: 8px;
            background-color: #ffffff;
          }
        `
      : css`
          height: 130px;
          div {
            width: 250px;
            height: 50px;
            border-radius: 5px;
            margin: 7.5px 0;
            color: white;
            font-size: 20px;
            font-family: 'Source Sans Pro', sans-serif;
            font-weight: 500;
            text-align: center;
            padding-top: 13.5px;
            transition: filter 0.2s linear;
            &:hover {
              filter: brightness(1.3);
            }
          }
        `}
`;
const SideBarLink = styled(Link)`
  width: 200px;
  height: 36px;
  margin-top: 21px;
  padding-top: 6px;
  background-color: #004b8d;
  border-radius: 5px;
  transition: background-color 0.2s linear;
  &:hover {
    background-color: #287bc5;
  }
`;
const SideBarButton = styled.div`
  width: 200px;
  height: 36px;
  margin-top: 8px;
  padding-top: 6px;
  background-color: #c13636;
  border-radius: 5px;
  transition: background-color 0.2s linear;
  cursor: pointer;
  &:hover {
    background-color: #ff5c5c;
  }
`;
const SidebarCategory = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  font-family: 'Noto Sans JP', sans-serif;
  font-weight: 500;
  a + a {
    margin-top: 60px;
  }
`;
