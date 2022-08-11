import React from 'react';
import styled from 'styled-components';

const HomeBanner1 = () => {
  return (
    <Wrapper>
      <img src={require('assets/images/home/banner/main.jpg')} alt="mainBanner" />
      <Text>
        Boardgame
        <br />
        Website
      </Text>
    </Wrapper>
  );
};

export default HomeBanner1;

const Wrapper = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
  }
`;
const Text = styled.div`
  position: absolute;
  cursor: default;
  color: #ffffff;
  font-size: 60px;
  font-family: 'Russo One', sans-serif;
  text-shadow: 5px 5px 7px rgba(163, 229, 255, 0.575);
  top: 50%;
  left: 0%;
  transform: translate(25%, -50%);
  @media all and (max-width: 530px) {
    font-size: 50px;
    left: -20px;
  }
  @media all and (max-width: 410px) {
    font-size: 45px;
    left: -25px;
  }
  @media all and (max-width: 350px) {
    font-size: 40px;
    left: -30px;
  }
`;
