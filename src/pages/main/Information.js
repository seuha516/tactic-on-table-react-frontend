import React from 'react';
import styled from 'styled-components';

const Information = () => {
  return (
    <Wrapper>
      <TitleWrapper>
        <Title1>T</Title1>
        <Title2>actic</Title2>
        <Title1>O</Title1>
        <Title2>n</Title2>
        <Title1>T</Title1>
        <Title3>able</Title3>
      </TitleWrapper>
      <ContentWrapper>
        보드게임 웹사이트
        <br />
        현재 개발중
      </ContentWrapper>
    </Wrapper>
  );
};

export default Information;

const Wrapper = styled.div`
  background-color: whitesmoke;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  padding: 40px 40px 50px 40px;
  @media all and (max-width: 1200px) {
    padding: 40px 30px 50px 30px;
  }
  @media all and (max-width: 900px) {
    padding: 40px 20px 50px 20px;
  }
  @media all and (max-width: 600px) {
    padding: 40px 15px 50px 15px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 85px;
  font-family: 'Hammersmith One', sans-serif;
`;
const Title1 = styled.div`
  font-size: 72px;
  @media all and (max-width: 550px) {
    font-size: 60px;
  }
  @media all and (max-width: 450px) {
    font-size: 48px;
  }
  @media all and (max-width: 370px) {
    font-size: 42px;
  }
`;
const Title2 = styled.div`
  font-size: 60px;
  margin-right: 20px;
  @media all and (max-width: 550px) {
    font-size: 50px;
    margin-right: 15px;
    margin-bottom: 2px;
  }
  @media all and (max-width: 450px) {
    font-size: 40px;
    margin-right: 10px;
    margin-bottom: 2px;
  }
  @media all and (max-width: 370px) {
    font-size: 36px;
    margin-right: 8px;
    margin-bottom: 1px;
  }
`;
const Title3 = styled.div`
  font-size: 60px;
  @media all and (max-width: 550px) {
    font-size: 50px;
    margin-bottom: 2px;
  }
  @media all and (max-width: 450px) {
    font-size: 40px;
    margin-bottom: 2px;
  }
  @media all and (max-width: 370px) {
    font-size: 36px;
    margin-bottom: 1px;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 20px;
  line-height: 30px;
  font-family: NanumSquareR;
  width: 100%;
  max-width: 1000px;
  height: 100%;
  min-height: 560px;
  margin-top: 45px;
  animation: appear 0.5s ease-out;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
