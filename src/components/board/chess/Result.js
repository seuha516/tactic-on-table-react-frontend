import React from 'react';
import styled from 'styled-components';

import InGameProfile from 'components/user/InGameProfile';

const Result = ({ result, onFinish }) => {
  return (
    <>
      <Barrier />
      <Wrapper>
        {result.winner ? (
          <>
            <Text>Winner</Text>
            <InGameProfile user={result.winner} borderColor={'#000000'} />
          </>
        ) : (
          <Draw>Draw</Draw>
        )}
        <FinishButton onClick={onFinish}>OK!</FinishButton>
      </Wrapper>
    </>
  );
};

export default Result;

const Barrier = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #36363677;
  z-index: 8;
`;
const Wrapper = styled.div`
  position: absolute;
  top: calc(50% - 105px);
  left: calc(50% - 135px);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 270px;
  height: 210px;
  background-color: #ffffff;
  padding: 12px;
  z-index: 9;
  border: 2px solid black;
  box-shadow: 2px 2px 2px 2px #646464;
`;
const Text = styled.div`
  font-size: 30px;
  font-weight: 600;
  font-family: NanumSquareR;
  margin: 7px 0 18px 0;
`;
const Draw = styled.div`
  font-size: 40px;
  font-weight: 600;
  font-family: NanumSquareR;
  margin: 55px 0 25px 0;
`;
const FinishButton = styled.div`
  margin-top: 15px;
  width: 100px;
  height: 35px;
  padding-top: 8px;
  font-size: 24px;
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
`;
