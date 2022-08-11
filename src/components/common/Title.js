import React from 'react';
import styled from 'styled-components';

export const LobbyTitle = () => {
  return (
    <TitleWrapper>
      <LobbyTitle1>L</LobbyTitle1>
      <LobbyTitle2>obby</LobbyTitle2>
    </TitleWrapper>
  );
};
export const MatchRecordTitle = () => {
  return (
    <TitleWrapper>
      <MatchRecord1>M</MatchRecord1>
      <MatchRecord2>atch</MatchRecord2>
      <MatchRecord1>R</MatchRecord1>
      <MatchRecord3>ecord</MatchRecord3>
    </TitleWrapper>
  );
};
export const RankingTitle = () => {
  return (
    <TitleWrapper>
      <Ranking1>R</Ranking1>
      <Ranking2>anking</Ranking2>
    </TitleWrapper>
  );
};
export const SmallMatchRecordTitle = () => {
  return (
    <TitleWrapper>
      <SmallMatchRecord1>M</SmallMatchRecord1>
      <SmallMatchRecord2>atch</SmallMatchRecord2>
      <SmallMatchRecord1>R</SmallMatchRecord1>
      <SmallMatchRecord3>ecord</SmallMatchRecord3>
    </TitleWrapper>
  );
};
export const EditProfileTitle = () => {
  return (
    <TitleWrapper>
      <EditProfileRecord1>E</EditProfileRecord1>
      <EditProfileRecord2>dit</EditProfileRecord2>
      <EditProfileRecord1>P</EditProfileRecord1>
      <EditProfileRecord3>rofile</EditProfileRecord3>
    </TitleWrapper>
  );
};
export const SignOutTitle = () => {
  return (
    <TitleWrapper>
      <SignOutRecord1>S</SignOutRecord1>
      <SignOutRecord2>ign</SignOutRecord2>
      <SignOutRecord1>O</SignOutRecord1>
      <SignOutRecord3>ut</SignOutRecord3>
    </TitleWrapper>
  );
};

const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 85px;
  font-family: 'Hammersmith One', sans-serif;
`;
const LobbyTitle1 = styled.div`
  font-size: 72px;
`;
const LobbyTitle2 = styled.div`
  font-size: 60px;
`;
const MatchRecord1 = styled.div`
  font-size: 72px;
  @media all and (max-width: 500px) {
    font-size: 60px;
  }
  @media all and (max-width: 400px) {
    font-size: 48px;
  }
`;
const MatchRecord2 = styled.div`
  font-size: 60px;
  margin-right: 20px;
  @media all and (max-width: 500px) {
    font-size: 50px;
    margin-right: 15px;
    margin-bottom: 2px;
  }
  @media all and (max-width: 400px) {
    font-size: 40px;
    margin-right: 10px;
    margin-bottom: 1px;
  }
`;
const MatchRecord3 = styled.div`
  font-size: 60px;
  @media all and (max-width: 500px) {
    font-size: 50px;
    margin-bottom: 2px;
  }
  @media all and (max-width: 400px) {
    font-size: 40px;
    margin-bottom: 1px;
  }
`;
const Ranking1 = styled.div`
  font-size: 66px;
`;
const Ranking2 = styled.div`
  font-size: 55px;
`;
const SmallMatchRecord1 = styled.div`
  font-size: 60px;
  @media all and (max-width: 400px) {
    font-size: 48px;
  }
`;
const SmallMatchRecord2 = styled.div`
  font-size: 50px;
  margin-right: 15px;
  margin-bottom: 2px;
  @media all and (max-width: 400px) {
    font-size: 40px;
    margin-right: 10px;
    margin-bottom: 1px;
  }
`;
const SmallMatchRecord3 = styled.div`
  font-size: 50px;
  margin-bottom: 2px;
  @media all and (max-width: 400px) {
    font-size: 40px;
    margin-bottom: 1px;
  }
`;
const EditProfileRecord1 = styled.div`
  font-size: 66px;
  @media all and (max-width: 400px) {
    font-size: 54px;
  }
`;
const EditProfileRecord2 = styled.div`
  font-size: 55px;
  margin-right: 15px;
  margin-bottom: 2px;
  @media all and (max-width: 400px) {
    font-size: 45px;
    margin-right: 10px;
    margin-bottom: 1px;
  }
`;
const EditProfileRecord3 = styled.div`
  font-size: 55px;
  margin-bottom: 2px;
  @media all and (max-width: 400px) {
    font-size: 45px;
    margin-bottom: 1px;
  }
`;
const SignOutRecord1 = styled.div`
  font-size: 60px;
  color: #9d0000;
`;
const SignOutRecord2 = styled.div`
  font-size: 50px;
  margin-right: 15px;
  margin-bottom: 2px;
  color: #9d0000;
`;
const SignOutRecord3 = styled.div`
  font-size: 50px;
  margin-bottom: 2px;
  color: #9d0000;
`;
