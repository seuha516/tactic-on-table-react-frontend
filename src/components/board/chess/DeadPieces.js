import React from 'react';
import styled from 'styled-components';

import { CHESS_COLOR, CHESS_PIECE_LIST } from 'lib/data/gameData';

const DeadPieces = ({ color, kill, etc }) => {
  if (etc) {
    return (
      <WrapperForEtc>
        <Pieces>
          {kill.sort().map((x, idx) => (
            <Image
              key={idx}
              src={CHESS_PIECE_LIST[x][`${color === CHESS_COLOR.WHITE ? 'black' : 'white'}Image`]}
              alt={CHESS_PIECE_LIST[x].name}
            />
          ))}
        </Pieces>
      </WrapperForEtc>
    );
  } else {
    return (
      <Wrapper>
        <Pieces>
          {kill.sort().map((x, idx) => (
            <Image
              key={idx}
              src={CHESS_PIECE_LIST[x][`${color === CHESS_COLOR.WHITE ? 'black' : 'white'}Image`]}
              alt={CHESS_PIECE_LIST[x].name}
            />
          ))}
        </Pieces>
      </Wrapper>
    );
  }
};

export default DeadPieces;

const Wrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  max-width: 100px;
  height: 415px;
  @media all and (max-width: 1450px) {
    display: none;
  }
`;
const WrapperForEtc = styled.div`
  margin-top: 50px;
  width: 100%;
  max-width: 100px;
  height: 415px;
  display: none;
  @media all and (max-width: 1450px) {
    display: block;
  }
`;
const Pieces = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Image = styled.img`
  width: 45px;
  height: 45px;
`;
