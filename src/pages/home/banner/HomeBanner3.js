import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HomeBanner3 = () => {
  return (
    <Wrapper>
      <img src={require('assets/images/Photo3_1.jpg')} alt="Banner3" />
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
  @media all and (max-width: 420px) {
    .photo .text {
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
const Text = styled.div`
  position: absolute;
  color: rgba(255, 255, 255, 1);
  font-size: 40px;
  font-family: 'Russo One', sans-serif;
  text-shadow: 5px 5px 3px rgb(0, 0, 0);
  text-align: right;
  top: 50%;
  left: 100%;
  transform: translate(-125%, -50%);
  cursor: pointer;
`;
