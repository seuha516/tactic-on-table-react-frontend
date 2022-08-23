import React from 'react';
import styled from 'styled-components';

import { CHESS_COLOR } from 'lib/data/gameData';

import DeadPieces from './DeadPieces';

const Etc = ({ user }) => {
  return (
    <Wrapper color={user.color === CHESS_COLOR.WHITE ? '#e7e7e7' : '#1e1e1e'}>
      <DeadPieces color={user.color} kill={user.kill} etc={true} />
    </Wrapper>
  );
};

export default Etc;

const Wrapper = styled.div`
  background-color: ${props => props.color};
  display: none;
  justify-content: center;
  align-items: center;
  width: calc(50% - 250px);
  @media all and (max-width: 1450px) {
    display: flex;
  }
  @media all and (max-width: 850px) {
    display: none;
  }
`;
