import React from 'react';
import styled from 'styled-components';

export const Loading = () => {
  return (
    <Wrapper>
      <Text>Tactic On Table</Text>
      <LoadingComponent r="80px" />
    </Wrapper>
  );
};
export const LoadingBox = ({ r }) => {
  return (
    <FlexBox>
      <LoadingComponent r={r} />
    </FlexBox>
  );
};
export const LoadingComponent = ({ r }) => {
  return <LoadingItem style={{ width: r, height: r }} />;
};

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Text = styled.div`
  font-size: 80px;
  font-family: 'Hurricane', cursive;
  animation: opacityChange 2s infinite linear;
  @keyframes opacityChange {
    0% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.8;
    }
  }
  margin-bottom: 20px;
`;
const FlexBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadingItem = styled.div`
  border: 3px solid #12389d;
  border-top-color: white;
  border-right-color: white;
  border-radius: 100%;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  animation: spin 1s infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
