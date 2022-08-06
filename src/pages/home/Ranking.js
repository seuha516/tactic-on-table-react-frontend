import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import styled, { css } from 'styled-components';

import { gameData } from 'lib/data/gameList';
import { getRanking } from 'modules/users';

const MatchRecord = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const ranking = useSelector(state => state.users.ranking);

  const { page } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const nowPage = parseInt(page || '1');
  const lastPage = Math.max(Math.floor((ranking ? ranking.count + 9 : 0) / 10), 1);
  const makePageList = (start, end) => {
    let ret = [];
    if (!ranking || ranking.count === 0) {
      return [1];
    } else if (nowPage > lastPage) {
      return [lastPage];
    } else {
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= lastPage) ret.push(i);
      }
      return ret;
    }
  };

  useEffect(() => {
    dispatch(getRanking(nowPage));
  }, [dispatch, nowPage]);

  return (
    <Wrapper>
      <TitleWrapper>
        <Title1>R</Title1>
        <Title2>anking</Title2>
      </TitleWrapper>
      <ContentWrapper>
        <CategoryWrapper>
          <CategoryUserInfoWrapper>
            <CategoryRankText>Rank</CategoryRankText>
            <CategoryNameText>Name</CategoryNameText>
          </CategoryUserInfoWrapper>
          <CategoryWinsWrapper>
            <CategoryTotalWinsText>Total Wins</CategoryTotalWinsText>
            {gameData.map(gameItem => (
              <CategoryGameIcon src={gameItem.icon} key={gameItem.name} />
            ))}
          </CategoryWinsWrapper>
        </CategoryWrapper>
        {ranking &&
          ranking.result.map((rankingItem, idx) => (
            <RankingWrapper key={idx}>
              <RankingUserInfoWrapper>
                <RankingRank rank={idx + 10 * nowPage - 9}>{idx + 10 * nowPage - 9}</RankingRank>
                <RankingUserInfo>
                  <ProfileImage src={process.env.REACT_APP_API_IMAGE + rankingItem.image} />
                  <Nickname>{rankingItem.nickname}</Nickname>
                </RankingUserInfo>
              </RankingUserInfoWrapper>
              <RankingWinsWrapper>
                <RankingTotalWins>{rankingItem.total_score}</RankingTotalWins>
                {rankingItem.score.slice(0, 4).map((rankingItemScore, idx) => (
                  <RankingWins key={idx}>{rankingItemScore}</RankingWins>
                ))}
              </RankingWinsWrapper>
            </RankingWrapper>
          ))}
      </ContentWrapper>
      <PageControlWrapper>
        {nowPage > 1 && ranking && ranking.count > 0 && (
          <PageControlButton to={`/ranking?page=1`} style={{ marginRight: '5px' }}>
            {`<<`}
          </PageControlButton>
        )}
        {nowPage > 1 && ranking && ranking.count > 0 && (
          <PageControlButton to={`/ranking?page=${nowPage - 1}`} style={{ marginRight: '5px' }}>
            {`<`}
          </PageControlButton>
        )}
        <PageControlNumberWrapper>
          {makePageList(nowPage - 2, nowPage + 2).map(n => (
            <PageControlNumber
              key={n}
              to={`/ranking?page=${n}`}
              style={n === nowPage ? { background: 'black', color: 'white' } : {}}
            >
              {n}
            </PageControlNumber>
          ))}
        </PageControlNumberWrapper>
        {nowPage < lastPage && ranking && ranking.count > 0 && (
          <PageControlButton to={`/ranking?page=${nowPage + 1}`} style={{ marginLeft: '5px' }}>
            {`>`}
          </PageControlButton>
        )}
        {nowPage < lastPage && ranking && ranking.count > 0 && (
          <PageControlButton to={`/ranking?page=${lastPage}`} style={{ marginLeft: '5px' }}>
            {`>>`}
          </PageControlButton>
        )}
      </PageControlWrapper>
    </Wrapper>
  );
};

export default MatchRecord;

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
  @media all and (max-width: 1400px) {
    padding: 40px 30px 50px 30px;
  }
  @media all and (max-width: 1200px) {
    padding: 40px 20px 50px 20px;
  }
  @media all and (max-width: 1150px) {
    padding: 40px 40px 50px 40px;
  }
  @media all and (max-width: 1050px) {
    padding: 40px 30px 50px 30px;
  }
  @media all and (max-width: 950px) {
    padding: 40px 20px 50px 20px;
  }
  @media all and (max-width: 420px) {
    padding: 40px 15px 50px 15px;
  }
  @media all and (max-width: 400px) {
    padding: 40px 10px 50px 10px;
  }
`;
const TitleWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  height: 85px;
  font-family: 'Hammersmith One', sans-serif;
`;
const Title1 = styled.div`
  font-size: 66px;
`;
const Title2 = styled.div`
  font-size: 55px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  min-height: 565px;
  margin-top: 40px;
  animation: appear 0.5s ease-out;
  font-family: 'Raleway', sans-serif;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  font-family: 'Raleway', sans-serif;
  min-height: 50px;
  margin-bottom: 5px;
  padding-bottom: 5px;
  border-bottom: 1px solid #c0c0c0;
`;
const CategoryUserInfoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CategoryRankText = styled.div`
  width: 60px;
  margin-right: 20px;
`;
const CategoryNameText = styled.div`
  width: 250px;
`;
const CategoryWinsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 330px);
  @media all and (max-width: 730px) {
    width: 100%;
    margin-top: 15px;
  }
`;
const CategoryTotalWinsText = styled.div`
  width: 150px;
  text-align: center;
  @media all and (max-width: 730px) {
    text-align: start;
    max-width: 200px;
    width: 40%;
  }
  @media all and (max-width: 375px) {
    width: 80px;
    font-size: 21px;
    padding-left: 2px;
  }
`;
const CategoryGameIcon = styled.img`
  width: 36px;
  height: 36px;
  margin: 0 7px;
`;
const RankingWrapper = styled.div`
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
const RankingUserInfo = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileImage = styled.img`
  width: 36px;
  height: 36px;
  background-color: #ffffff;
  margin-right: 10px;
  border-radius: 40px;
  box-shadow: 1px 1px 1px 1px #000000;
`;
const Nickname = styled.div`
  width: 204px;
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
    width: 65px;
    padding-left: 10px;
  }
`;
const RankingWins = styled.div`
  width: 50px;
  text-align: center;
  color: #545454;
`;
const PageControlWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 50px;
  margin-top: 30px;
`;
const PageControlButton = styled(Link)`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  margin-top: 1px;
  cursor: pointer;
  font-family: 'Nanum Gothic Coding', monospace;
  transition: all 0.2s linear;
  color: #828282;
  &:hover {
    color: black;
  }
  @media all and (max-width: 432px) {
    width: 25px;
    height: 25px;
  }
`;
const PageControlNumberWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 5px;
`;
const PageControlNumber = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 22.5px;
  font-family: 'Lexend', sans-serif;
  width: 30px;
  height: 30px;
  margin: 0px 7.5px;
  border-radius: 15px;
  background: white;
  box-shadow: 1px 2px gray;
  transition: all 0.2s linear;
  &:hover {
    background: rgba(0, 0, 0, 0.6);
    color: white;
  }
  @media all and (max-width: 432px) {
    margin: 0 2.5px;
  }
`;
