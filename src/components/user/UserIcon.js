import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const UserIcon = ({ user, size, winner }) => {
  const [tagVisible, setTagVisible] = useState(false);
  const nicknameRef = useRef(null);

  useEffect(() => {
    const obj = nicknameRef.current;
    const toggleTag = state => setTagVisible(state);
    obj.addEventListener('mouseover', () => toggleTag(true));
    obj.addEventListener('mouseout', () => toggleTag(false));
    return () => {
      obj.removeEventListener('mouseover', () => toggleTag(true));
      obj.removeEventListener('mouseout', () => toggleTag(false));
    };
  }, []);

  if (user) {
    if (user.username.substring(0, 2) === '익명') {
      return (
        <WrapperDiv style={{ width: size, height: size }}>
          <ProfileImage
            src={process.env.REACT_APP_API_IMAGE + 'profile_default.png'}
            winner={winner}
          />
          {tagVisible && <ProfileNickname>{user.nickname}</ProfileNickname>}
          <FakeBarrier ref={nicknameRef} />
        </WrapperDiv>
      );
    } else {
      return (
        <Wrapper to={`/user/${user.username}`} style={{ width: size, height: size }}>
          <ProfileImage src={process.env.REACT_APP_API_IMAGE + user.image} winner={winner} />
          {tagVisible && <ProfileNickname>{user.nickname}</ProfileNickname>}
          <FakeBarrier ref={nicknameRef} />
        </Wrapper>
      );
    }
  } else {
    return (
      <WrapperDiv style={{ width: size, height: size }}>
        <ProfileImage
          src={process.env.REACT_APP_API_IMAGE + 'profile_default.png'}
          winner={winner}
        />
        {tagVisible && <ProfileNickname>탈퇴한 유저</ProfileNickname>}
        <FakeBarrier ref={nicknameRef} />
      </WrapperDiv>
    );
  }
};

export default UserIcon;

const Wrapper = styled(Link)`
  position: relative;
  margin: 1px;
`;
const WrapperDiv = styled.div`
  position: relative;
  margin: 1px;
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: #ffffff;
  border: 1px solid #64646436;
  box-shadow: 1px 1px #414141;
  ${props =>
    props.winner &&
    css`
      border: 1px solid #0ca1a7;
      box-shadow: 1px 1px #375758;
    `}
`;
const ProfileNickname = styled.div`
  z-index: 15;
  position: absolute;
  width: auto;
  white-space: nowrap;
  padding: 5px 10px;
  border-radius: 5px;
  height: 27px;
  top: calc(50% - 13.5px);
  left: 50%;
  font-size: 16px;
  font-family: 'Noto Sans KR', sans-serif;
  text-align: center;
  color: #ffffff;
  background-color: #000000dd;
`;
const FakeBarrier = styled.div`
  z-index: 20;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  top: 0;
  left: 0;
  background-color: transparent;
`;
