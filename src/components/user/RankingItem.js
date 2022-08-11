import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const RankingItem = ({ ranking, rank }) => {
  return (
    <Wrapper>
      <RankingUserInfoWrapper>
        <RankingRank rank={rank}>{rank}</RankingRank>
        <RankingUserInfo to={`/user/${ranking.username}`}>
          <ProfileImage src={process.env.REACT_APP_API_IMAGE + ranking.image} />
          <Nickname>{ranking.nickname}</Nickname>
        </RankingUserInfo>
      </RankingUserInfoWrapper>
      <RankingWinsWrapper>
        <RankingTotalWins>{ranking.total_score}</RankingTotalWins>
        {ranking.score.slice(0, 4).map((rankingItemScore, idx) => (
          <RankingWins key={idx}>{rankingItemScore}</RankingWins>
        ))}
      </RankingWinsWrapper>
    </Wrapper>
  );
};

export default RankingItem;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 47px;
  margin-bottom: 4px;
  padding-bottom: 5px;
  border-bottom: 1px solid #c0c0c0;
`;
const RankingUserInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RankingRank = styled.div`
  width: 56px;
  margin-right: 24px;
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Lexend', sans-serif;
  line-height: 40px;
  ${props =>
    props.rank === 1
      ? css`
          color: #ff2d2d;
          text-shadow: 1px 1px #686868;
        `
      : props.rank === 2
      ? css`
          color: #ff5d2d;
          text-shadow: 1px 1px #686868;
        `
      : props.rank === 3 &&
        css`
          color: #ffab2d;
          text-shadow: 1px 1px #686868;
        `}
`;
const RankingUserInfo = styled(Link)`
  display: flex;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background-color: #ffffff;
  border: 1px solid #64646436;
  box-shadow: 1px 1px #414141;
  margin: 1px;
`;
const Nickname = styled.div`
  width: 204px;
  margin-left: 8px;
  font-size: 18px;
  font-weight: 600;
  line-height: 40px;
  font-family: NanumSquareR;
`;
const RankingWinsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 330px);
  font-size: 20px;
  font-family: 'Lexend', sans-serif;
  @media all and (max-width: 730px) {
    width: 100%;
    margin-top: 15px;
  }
`;
const RankingTotalWins = styled.div`
  width: 150px;
  text-align: center;
  @media all and (max-width: 730px) {
    text-align: start;
    padding-left: 20px;
    max-width: 200px;
    width: 40%;
  }
  @media all and (max-width: 375px) {
    width: 56px;
    padding-left: 0px;
    margin-right: 9px;
    text-align: center;
  }
`;
const RankingWins = styled.div`
  width: 50px;
  text-align: center;
  color: #545454;
`;
