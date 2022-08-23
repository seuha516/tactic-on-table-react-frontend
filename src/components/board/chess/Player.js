import React from 'react';
import styled, { css } from 'styled-components';

import { CHESS_PLAYER_COLOR, CHESS_COLOR } from 'lib/data/gameData';

import { LoadingBox } from 'components/common/Loading';
import InGameProfile from 'components/user/InGameProfile';
import DeadPieces from './DeadPieces';

const Player = ({ user, isGame, isMe, turn, onReady }) => {
  if (!user) {
    return (
      <Wrapper color="#f7f7f7">
        <LoadingBox r="64px" />
      </Wrapper>
    );
  } else if (isGame) {
    return (
      <Wrapper color={CHESS_PLAYER_COLOR[user.color]} turn={user.color === turn ? 'true' : 'false'}>
        <InGameProfile
          user={user}
          borderColor={user.color === CHESS_COLOR.WHITE ? '#000000' : '#939393'}
        />
        <DeadPieces color={user.color} kill={user.kill} />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper color="#f7f7f7">
        <InGameProfile user={user} borderColor="#000000" />
        {user.ready ? (
          <ReadyText>Ready</ReadyText>
        ) : isMe ? (
          <ReadyButton onClick={onReady}>Ready</ReadyButton>
        ) : (
          <ReadyText style={{ color: '#a0a0a0' }}>Ready</ReadyText>
        )}
      </Wrapper>
    );
  }
};

export default Player;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: calc(50% - 320px);
  height: 640px;
  background-color: ${props => props.color};
  color: ${props => (props.color === '#000000' ? '#ffffff' : '#000000')};
  padding: 50px 0;
  border: 5px solid #ffffff00;
  ${props =>
    props.turn === 'true' &&
    css`
      padding: 45px 0;
      border-color: #015e00;
    `}
  @media all and (max-width: 1450px) {
    width: 100%;
    height: 100px;
    padding: 0;
    flex-direction: row;
    justify-content: center;
  }
  @media all and (max-width: 430px) {
    height: 80px;
    border-width: 2px 5px;
  }
`;
const ReadyButton = styled.div`
  margin-top: 170px;
  width: 150px;
  height: 55px;
  padding-top: 10px;
  font-size: 40px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  text-align: center;
  background-color: #343434;
  color: white;
  box-shadow: 2px 2px 2px 2px #a4a4a4;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.2s linear;
  &:hover {
    background-color: #000000;
  }
  @media all and (max-width: 1450px) {
    margin-top: 0;
  }
  @media all and (max-width: 430px) {
    width: 80px;
    height: 45px;
    padding-top: 8px;
    font-size: 32px;
  }
`;
const ReadyText = styled.div`
  margin-top: 170px;
  width: 150px;
  height: 55px;
  padding-top: 5px;
  font-size: 50px;
  font-family: 'Yanone Kaffeesatz', sans-serif;
  text-align: center;
  border-radius: 3px;
  @media all and (max-width: 1450px) {
    margin-top: 0;
  }
  @media all and (max-width: 430px) {
    width: 80px;
    height: 45px;
    padding-top: 8px;
    font-size: 32px;
  }
`;
