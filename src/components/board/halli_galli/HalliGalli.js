import React from 'react';
import styled from 'styled-components';

const Chess = ({ myUsername, socket, room }) => {
  return <Wrapper style={{ backgroundColor: '#e4e4e4', fontSize: '36px' }}>준비중!!</Wrapper>;
};

export default Chess;

const Wrapper = styled.div`
  width: 100%;
  height: 640px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media all and (max-width: 1450px) {
    flex-direction: column-reverse;
    height: 700px;
  }
  @media all and (max-width: 550px) {
    height: 600px;
  }
  @media all and (max-width: 430px) {
    height: 480px;
  }
  @media all and (max-width: 340px) {
    height: 460px;
  }
`;
