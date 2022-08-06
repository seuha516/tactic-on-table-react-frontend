import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomeBanner2 = () => {
  return (
    <Wrapper>
      <img src={require('assets/images/home/banner/chess.jpg')} alt="Banner2" />
      <Text>
        <Link to="/games/chess">
          <div>Play</div>
          <div>Chess</div>
        </Link>
      </Text>
    </Wrapper>
  );
};

export default HomeBanner2;

const Wrapper = styled.div`
  position: relative;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;
const Text = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 1);
  font-size: 60px;
  font-family: 'Russo One', sans-serif;
  text-shadow: 5px 5px 3px rgba(99, 99, 99, 0.575);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
