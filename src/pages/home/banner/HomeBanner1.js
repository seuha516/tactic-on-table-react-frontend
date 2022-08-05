import React from 'react';
import styled from 'styled-components';

const HomeBanner1 = () => {
  return (
    <Wrapper>
      <img src={require('assets/images/Photo1_1.jpg')} alt="Banner1" />
      <Text>
        Think it,
        <br />
        Do it.
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
  @media all and (max-width: 420px) {
    .photo .text {
      width: 205px;
      font-size: 50px;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
const Text = styled.div`
  position: absolute;
  cursor: default;
  color: rgba(255, 255, 255, 1);
  font-size: 60px;
  font-family: 'Russo One', sans-serif;
  text-shadow: 5px 5px 7px rgba(163, 229, 255, 0.575);
  top: 50%;
  left: 0%;
  transform: translate(25%, -50%);
`;
