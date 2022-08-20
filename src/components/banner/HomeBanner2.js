import React from 'react';
import styled, { css } from 'styled-components';

import { GAME_LIST } from 'lib/data/gameData';

const HomeBanner2 = ({ gameidx }) => {
  const onPlayGame = gameidx => {
    alert(`play ${GAME_LIST[gameidx].name}`);
  };

  return (
    <Wrapper>
      <img src={GAME_LIST[gameidx].banner} alt="gameBanner" />
      <Text gameidx={gameidx} onClick={() => onPlayGame(gameidx)}>
        <div>Play</div>
        <div gameidx={gameidx}>{GAME_LIST[gameidx].name}</div>
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
    filter: brightness(0.5);
  }
`;
const Text = styled.div`
  width: 100%;
  text-align: center;
  cursor: pointer;
  position: absolute;
  color: #ffffff;
  font-size: 60px;
  font-family: 'Russo One', sans-serif;
  text-shadow: 5px 5px 3px #545454;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transition: text-shadow 0.2s linear;
  &:hover {
    text-shadow: 5px 5px 3px #000000;
  }
  div:nth-child(2) {
    ${props =>
      props.gameidx === 1 &&
      css`
        font-size: 55px;
      `}
  }
`;
