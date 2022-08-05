import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import { getLength } from 'lib/utils/getLength';

const CategoryItems = [
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

  const [open, setOpen] = useState(false);
  const { user } = useSelector(state => ({
    user: state.users.user,
  }));

  const sidebarRemover = () => {
    if (window.innerWidth > 640) setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [location]);
  useEffect(() => {
    window.addEventListener('resize', sidebarRemover);
    return () => {
      window.removeEventListener('resize', sidebarRemover);
    };
  }, []);

  const onLogout = () => {};
  const onRemove = () => {};

  return (
    <>
      <SidebarWrapper open={open}>
        <UserInfo user={false}>
          {user ? (
            <>
              <div>
                <img src={require('assets/images/Profile_blank.png')} alt="Profile" />
              </div>
              <div>{user.username}</div>
            </>
          ) : (
            <>
              <Link to="/login">
                <SignupButton>Sign Up</SignupButton>
              </Link>
              <Link to="/signup">
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
        {user && <button onClick={onLogout}>Logout</button>}
      </SidebarWrapper>

      <Wrapper>
        <Title>
          <Navbar src={require('assets/images/Navbar_icon.png')} alt="Navbar" onClick={() => setOpen(!open)} />
          <TitleTextWrapper to="/">
            <Icon src={require('assets/images/TOT_icon_white.png')} alt="Icon" />
            <TitleText>Tactic On Table</TitleText>
          </TitleTextWrapper>
        </Title>

        <Category>
          {CategoryItems.map(item => (
            <Link to={item.to} key={item.value}>
              <CategoryItem>{item.value}</CategoryItem>
            </Link>
          ))}
        </Category>

        {!user ? (
          <ProfileWrapper>
            <ProfileImage src={require('assets/images/Profile_blank.png')} alt="Profile" />
            <ProfileName length={getLength('네에에4123424.1', '18px', 'Noto Sans KR')}>네에에4123424.1</ProfileName>
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
const Navbar = styled.img`
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
  margin: 0 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media all and (max-width: 560px) {
    display: none;
  }
`;
const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 15px;
`;
const ProfileName = styled.div`
  margin: -1.5px 6.5px 0 13.5px;
  color: white;
  font-size: ${props => (props.length > 135 ? '16px' : '18px')};
  font-family: 'Noto Sans KR', sans-serif;
`;
const SidebarWrapper = styled.div`
  position: fixed;
  transition: all 0.2s linear;
  margin-top: 70px;
  width: 300px;
  max-width: 300px;
  height: calc(100% - 70px);
  z-index: 50;
  color: white;
  background-color: #000000f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  margin-left: ${props => (props.open ? '0px' : '-300px')};
`;
const UserInfo = styled.div`
  width: 260px;
  height: 135px;
  border-radius: 10px;
  margin: 36px 0 60px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${props =>
    props.user
      ? css`
          background-color: #ffffff2f;
        `
      : css`
          background-color: transparent;
          div {
            width: 250px;
            height: 50px;
            border-radius: 5px;
            margin: 7.5px 0;
            color: white;
            font-size: 18px;
            font-family: 'Source Sans Pro', sans-serif;
            font-weight: 500;
            cursor: pointer;
            text-align: center;
            padding-top: 15px;
          }
        `}
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
