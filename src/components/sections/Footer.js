import React from 'react';
import { AiFillGithub, AiFillFacebook, AiFillInstagram } from 'react-icons/ai';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  padding: 35px 100px;
  color: white;
  background-color: #171717;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  @media all and (max-width: 1024px) {
    height: 130px;
    padding: 33.5px 80px;
  }
  @media all and (max-width: 768px) {
    height: 100px;
    padding: 25px 40px;
  }
`;
const Flexbox = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const URL = styled.div`
  font-size: 20px;
  font-family: 'Lato', sans-serif;
  @media all and (max-width: 1024px) {
    font-size: 18px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
`;
const Name = styled.div`
  font-size: 20px;
  font-family: 'Noto Serif KR', serif;
  @media all and (max-width: 1024px) {
    font-size: 18px;
  }
  @media all and (max-width: 768px) {
    font-size: 15px;
  }
`;
const Icon = styled.a`
  margin-left: 20px;
  @media all and (max-width: 1024px) {
    margin-left: 18px;
  }
  @media all and (max-width: 768px) {
    margin-left: 15px;
  }
  @media all and (max-width: 400px) {
    margin-left: 10px;
  }
  @media all and (max-width: 350px) {
    margin-left: 5px;
  }
  @media all and (max-width: 320px) {
    margin-left: 2px;
  }
  svg {
    width: 30px;
    height: 30px;
    @media all and (max-width: 1024px) {
      width: 27px;
      height: 27px;
    }
    @media all and (max-width: 768px) {
      width: 20px;
      height: 20px;
    }
    @media all and (max-width: 400px) {
      width: 18px;
      height: 18px;
    }
  }
`;
const Info = styled.div`
  font-size: 16px;
  font-family: 'Nanum Myeongjo', serif;
  margin-top: 3px;
  margin-left: 15px;
  @media all and (max-width: 1024px) {
    font-size: 14px;
    margin-left: 10px;
  }
  @media all and (max-width: 768px) {
    font-size: 12px;
    margin-left: 8px;
  }
  @media all and (max-width: 550px) {
    display: none;
  }
`;

const Footer = () => {
  return (
    <Wrapper>
      <Flexbox>
        <URL>Tactic on Table</URL>
        <Flexbox>
          <Icon
            href="https://github.com/seuha516/tactic-on-table-react-frontend"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub />
          </Icon>
          <Icon href="https://www.facebook.com/seuha516" target="_blank" rel="noopener noreferrer">
            <AiFillFacebook />
          </Icon>
          <Icon href="https://www.instagram.com/jeon.seungha/" target="_blank" rel="noopener noreferrer">
            <AiFillInstagram />
          </Icon>
        </Flexbox>
      </Flexbox>
      <Flexbox>
        <Flexbox>
          <Name>?????????</Name>
        </Flexbox>
        <Flexbox>
          <Info>?????????: seuha516@naver.com</Info>
          <Info>????????????: seuha516</Info>
          <Info>?????????: seuha516</Info>
        </Flexbox>
      </Flexbox>
    </Wrapper>
  );
};

export default Footer;
