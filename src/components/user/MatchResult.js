import React from 'react';
import styled, { css } from 'styled-components';

import UserIcon from 'components/user/UserIcon';

const MatchResult = ({ result }) => {
  return (
    <ResultWrapper>
      {result.type === '1on1' ? (
        result.winner !== null ? (
          <>
            <ResultText type="winner">Winner</ResultText>
            <UserIcon user={result.winner} winner={true} size="40px" />
          </>
        ) : (
          <ResultText type="draw">Draw</ResultText>
        )
      ) : result.type === 'multi' ? (
        <>
          <ResultText type="1st">1st</ResultText>
          <UserIcon user={result.winner} winner={true} size="40px" />
        </>
      ) : (
        <>
          <ResultText type="canceled">Canceled</ResultText>
        </>
      )}
    </ResultWrapper>
  );
};

export default MatchResult;

const ResultWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 160px;
  @media all and (max-width: 760px) {
    margin-top: 15px;
    width: 35%;
  }
  @media all and (max-width: 550px) {
    margin-top: 10px;
    width: 100%;
  }
`;
const ResultText = styled.div`
  line-height: 40px;
  font-size: 17px;
  font-weight: 600;
  margin-right: 5px;
  ${props =>
    props.type === 'winner'
      ? css`
          color: #187e1b;
          margin-right: 5px;
        `
      : props.type === '1st'
      ? css`
          color: #2a2ac1;
          margin-right: 5px;
        `
      : props.type === 'draw'
      ? css`
          color: #2e2e2e;
          font-size: 18px;
        `
      : css`
          color: #d51414;
          font-size: 18px;
        `}
`;
