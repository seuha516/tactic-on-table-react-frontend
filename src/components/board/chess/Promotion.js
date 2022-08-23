import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { CHESS_COLOR, CHESS_PIECE_LIST } from 'lib/data/gameData';

import styled from 'styled-components';

const Promotion = ({ myColor, popUpRef, setPromotion, onPromotion }) => {
  return (
    <Wrapper ref={popUpRef}>
      <Text>
        Promotion <AiOutlineClose onClick={() => setPromotion(false)} />
      </Text>
      <PiecesWrapper>
        {[1, 2, 3, 4].map(x => (
          <img
            key={x}
            src={CHESS_PIECE_LIST[x][`${myColor === CHESS_COLOR.WHITE ? 'white' : 'black'}Image`]}
            alt="icon"
            onClick={() => onPromotion(x)}
          />
        ))}
      </PiecesWrapper>
    </Wrapper>
  );
};

export default Promotion;

const Wrapper = styled.div`
  position: absolute;
  top: calc(50% - 50px);
  left: calc(50% - 135px);
  width: 270px;
  height: 100px;
  background-color: #ffffff;
  padding: 10px;
  z-index: 7;
  border: 2px solid black;
`;
const Text = styled.div`
  font-size: 18px;
  font-weight: 600;
  font-family: NanumSquareR;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  svg {
    margin-top: -3px;
    margin-right: -3px;
    cursor: pointer;
  }
`;
const PiecesWrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  img {
    width: 55px;
    height: 55px;
    background-color: #deefff;
    border-radius: 5px;
    border: 2px solid #757575;
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
      border: 2px solid black;
      background-color: #a3cef7;
    }
  }
`;
