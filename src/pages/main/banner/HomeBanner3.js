import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeBanner3 = () => {
  return (
    <Wrapper>
      <img src={require('assets/images/home/banner/etc.jpg')} alt="etcBanner" />
      <Text>
        <Link to="/information">
          <div>More</div>
          <div>Information</div>
        </Link>
      </Text>
    </Wrapper>
  );
};

export default HomeBanner3;

const Wrapper = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
`;
const Text = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 1);
  font-size: 40px;
  font-family: 'Russo One', sans-serif;
  text-shadow: 5px 5px 3px #363636;
  text-align: right;
  top: 50%;
  left: 100%;
  transform: translate(-125%, -50%);
  cursor: pointer;
  transition: text-shadow 0.2s linear;
  &:hover {
    text-shadow: 5px 5px 3px #000000;
  }
  @media all and (max-width: 375px) {
    font-size: 36px;
    transform: translate(-115%, -50%);
  }
`;
