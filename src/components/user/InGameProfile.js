import React from 'react';
import styled from 'styled-components';

const InGameProfile = ({ user, borderColor }) => {
  return (
    <Wrapper>
      <Image
        src={process.env.REACT_APP_API_IMAGE + user.image}
        alt="profile"
        borderColor={borderColor}
      />
      <div>{user.nickname}</div>
    </Wrapper>
  );
};

export default InGameProfile;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 190px;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 18px;
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border: 2px solid;
  border-color: ${props => props.borderColor};
  border-radius: 45px;
  margin-bottom: 6px;
  background-color: #ffffff;
`;
